/**
 * @overview ccm component for generating many unique exam variations
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version 1.0.0 // TODO: create a version of this ccm-component and save as versions/ccm.comp-1.0.0.js
 * - TODO: describe what is done
 *
 */

(() => {

  "use strict";

  const component = {

    /**
     * unique component name
     */
    name: 'exam_generator',

    /**
     * recommended used framework version
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.5.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     */
    config: {

      html: {

        topbar: {

          tag: "div",
          class: "topbar",
          inner: [
            {
              tag: "img",
              id: "hbrs-logo",
              src: "resources/hbrs-logo.svg",
              width: "300rem",
              height: "auto"
            },
            {
              tag: "h1",
              id: "builder-title",
              inner: "Exam-Generator"
            }

          ]

        },

        generator: {

          tag: "div",
          class: "generator",
          inner: [
            {
              tag: "hr"
            },
            {
              tag: "div",
              id: "generator-form",
              inner: []
            },
            {
              tag: "hr"
            },
            {
              tag: "div",
              id: "generated-ids",
              inner: []
            }
          ]
        }
      },

      /**
       * used ccm components
       */
      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],

      logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],

      /**
       * used ccm datastores
       */

      store_editor: {
        store: [ "ccm.store", { name: "gkolev2s_exam_editor", url: "https://ccm2.inf.h-brs.de" } ],
      },

      store_generator: {
        store: [ "ccm.store", { name: "gkolev2s_exam_generator", url: "https://ccm2.inf.h-brs.de" } ],
      },

      /**
       * css resources
       */
      css: ["ccm.load",
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
        // "resources/default.css"
      ],
    },

    /**
     * for creating instances of this component
     * @constructor
     */
    Instance: function () {

      /**
       * shortcut to help functions
       */
      let $;

       /**
        * init is called once after all dependencies are solved and is then deleted
        */
       this.init = async () => {

        $ = this.ccm.helper;

      };

      /**
       * starts the instance
       */
      this.start = async () => {

        // logging of 'start' event
        this.logger.log( "start-exam-generator" );

        const topbar = $.html( this.html.topbar, {});

        // submit config for 'exam-generators's form
        const submitConfig = {
          "entries": [ "ccm.get", "resources/datasets.js", "gkolev2s_generator.data" ],
          "data": {
            "store": [ "ccm.store", "resources/datasets.js" ],
            "key": "gkolev2s_generator_init"
          },
          "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
          "onfinish": {
            "log": true,
            callback: function () {
              generate()
            }
          }
        };

        // create and start the submit instance to html structure
        const submitInstance = await this.submit.instance(submitConfig);
        const submitResult = await submitInstance.start();

        const generator = $.html( this.html.generator, {});

        // render the sections to the given in config html structure
        $.setContent( this.element, [ topbar, generator ] );

        // append submit form to the html structure
        this.element.querySelector("#generator-form").appendChild(submitInstance.root);

        // check if such exam is existing
        const isExisting = (exam) => {
          if (exam == null)  {
            window.alert(`The exam ID is wrong. Please try again.`);
          } else {
            return true;
          }
        };

        // generate new exams and save those in matrix
        let generate = async () => {

          let examId = submitInstance.getValue().exam_id;
          console.log(`examId: ${examId}`);

          let amount = submitInstance.getValue().amount;
          console.log(`amount: ${amount}`);

          let quizOrigin = await this.store_editor.store.get(examId);
          // [] is different, cause when storing on lvl 2 the key is a value in array and not just a string as key!
          // let quizOrigin = await this.store2.get([examId]);
          console.log("--- original quiz data:");
          console.log(quizOrigin);

          if (isExisting(quizOrigin)) {

            let builderData = [...quizOrigin.quiz];
            console.log(builderData);

            const defaultQuizCss = [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ];

            // create amount of variations with unique key, that will be used to unlock exact this exam
            for (let nr = 0; nr < amount; nr++) {
              await this.store_generator.store.set(
                {
                  "key": $.generateKey
                }
              );
            };

            const generatedQuizConfigs = [];
            // fill up array with the created quiz configs
            for (var i = 0; i < builderData.length; i++) {
              generatedQuizConfigs.push(
                {
                  "key": "quiz" + i,
                  "quiz_title": builderData[i].exc_title,
                  "questions": builderData[i].questions,
                  "feedback": builderData[i].feedback,
                  "navigation": builderData[i].navigation,
                  "start_button": builderData[i].start_button,
                  "random": builderData[i].shuffle_answers,
                  "shuffle": builderData[i].shuffle_questions,
                  "placeholder": {
                    "prev": builderData[i].previous_label,
                    "next": builderData[i].next_label,
                    "submit": builderData[i].submit_label,
                    "finish": builderData[i].finish_label
                  },
                  "onfinish": {
                    "clear": builderData[i].clear_onfinish,
                    "restart": builderData[i].restart_onfinish,
                    "store": {
                      "settings": {
                        "name": "gkolev2s_exam_results",
                        "url": "https://ccm2.inf.h-brs.de",
                      },
                      "key": null
                    },
                    "alert": "Exercise results saved!",
                  },
                  "css": defaultQuizCss
                }
              );
            };

            console.log("--- generated quiz configs array:");
            console.log(generatedQuizConfigs);

            // get all the generated versions and render each of the quiz configs
            const versions = await this.store_generator.store.get();
            console.log("--- generated versions:");
            console.log(versions);

            for (var i = 0; i < versions.length; i++) {

             let clonedQuizConfigs = [...generatedQuizConfigs];
             $.shuffleArray(clonedQuizConfigs);
             console.log("--- shuffled cloned quiz configs:");
             console.log(clonedQuizConfigs);

             await this.store_generator.store.set(
               {
                "key": versions[i].key,
                "configs": clonedQuizConfigs,
                "results": [],
                "studentid": null
               }
             );
            };

            console.log(await this.store_generator.store.get());

            window.alert(`Exam versions were generated successfully!`);

            // create array with the generated exam keys (and show those to the user)
            let generatedIds = [];
            for (var i = 0; i < versions.length; i++) {
              generatedIds.push(versions[i].key);
            };

            /**
             * create html table with generated ids and show those on page (LOC: 307-321)
             * Quelle: https://code-boxx.com/create-table-from-array-javascript/
             */
            let perrow = 1;
            let html = "<table><caption>Generated Exam Keys:</caption><tr>";

            for (var i = 0; i<generatedIds.length; i++) {
              html += "<td>" + generatedIds[i] + "</td>";
              // Break into next row
              var next = i+1;
              if (next%perrow==0 && next!=generatedIds.length) {
                html += "</tr><tr>";
              }
            }
            html += "</tr></table>";

            // attach the generated keys to the html container
            this.element.querySelector("#generated-ids").innerHTML = html;

            // inform user
            window.alert("Scroll down to see a list of generated exam ids. Give one to every exam participant so they will be allowed to unlock an exam with it.");
          };

        };

      };

    }

  };

  // create custom element and start the component
  // Quelle: AKless-components; MKaul-components
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
