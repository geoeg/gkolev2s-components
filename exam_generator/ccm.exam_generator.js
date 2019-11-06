/**
 * @overview ccm component for generating exams
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
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
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     */
    config: {

      /*** html structure ***/
      html: {

        // TODO: no need if loading the generator after submitting the data in exam_builder (there is already a topbar)
        // topbar section:
        topbar: {

          // topbar main div container
          tag: "div",
          class: "topbar",
          inner: [
            {
              // h-brs logo
              tag: "img",
              id: "hbrs-logo",
              src: "resources/hbrs-logo.svg",
              width: "300rem",
              height: "auto"
            },
            {
              // generator title
              tag: "h1",
              id: "builder-title",
              inner: "Exam-Generator"
            }

          ]

        },

        // exam generator form section:
        generator: {

          tag: "div",
          class: "generator",
          inner: [
            // {
            //   tag: "hr"
            // },
            {
              tag: "div",
              id: "data-btns",
              inner: [
                // {
                //   tag: "button",
                //   class: "btn btn-primary",
                //   inner: "get current saved data",
                //   title: "get current data (check console)",
                //   onclick: "%get%"
                // }
              ]
            },
            {
              tag: "hr"
            },
            {
              // generator form section
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

      /*** ccm-Components ***/

      // add submit component
      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],

      // add logger instance
      logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],

      /*** ccm-Datastores ***/

      // db lvl-1 (lost after reload)
      store_js: {
        store: [ "ccm.store",  "../exam_builder/resources/datasets.js" ],
      },

      // db lvl-3 (hbrs-Server)
      store_builder: {
        store: [ "ccm.store", { name: "gkolev2s_exam_builder", url: "https://ccm2.inf.h-brs.de" } ],
      },

      store_generator: {
        store: [ "ccm.store", { name: "gkolev2s_exam_generator", url: "https://ccm2.inf.h-brs.de" } ],
      },

      /*** css resources ***/

      css: ["ccm.load",
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
        "resources/default.css"
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

        // logging of "start" event
        // this.logger.log( "start-exam-generator" );

        // section topbar logo, title
        const topbar = $.html( this.html.topbar, {});

        // Submit Config: 'Exam-Generator form'
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

        // create, start and append submit instance for 'Generator Form' to html structure
        const submitInstance = await this.submit.instance(submitConfig);
        const submitResult = await submitInstance.start();

        // section exam info
        const generator = $.html( this.html.generator, {
          // additional funtions to help working with data
          // will be deleted at the end
          // get: async () => {
          //   console.log(await this.store.get());
          //   console.log("---> data at lvl-1 (.js):");
          //   console.log(await this.store_js.store.get());
          //   console.log("---> data at lvl-3 (builder)");
          //   console.log(await this.store_builder.store.get());
          //   console.log("---> data at lvl-3 (generator)");
          //   console.log(await this.store_generator.store.get());
          // }

        });

        // render the sections to the given in config html structure
        $.setContent( this.element, [ topbar, generator ] );
        // append 'generator-form' to the html structure
        this.element.querySelector("#generator-form").appendChild(submitInstance.root);

        // generate new exams and save those in matrix
        let generate = async () => {

          // get data form "Exam ID" field
          let examId = submitInstance.getValue().exam_id;
          // get amount from "Amount" field (amount of exam variations to create)
          let amount = submitInstance.getValue().amount;

          let quizOrigin = await this.store_builder.store.get(examId);

          if (quizOrigin == null) {
            // inform user
            window.alert(`The exam ID: ${examId} is wrong. Please try again.`);

          } else {

            // get the original questions
            let questOrigin = quizOrigin.quiz[0].questions;

            // the different quiz exercises
            let builderData = [];
            for (var i = 0; i < quizOrigin.quiz.length; i++) {
              builderData.push(quizOrigin.quiz[i]);
            };

            // default quiz css
            const defaultQuizCss = [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ];

            // create amount of variations with unique key, that will be used to unlock exact this exam
            for (var nr = 0; nr < amount; nr++) {
              await this.store_generator.store.set(
                {
                  "key": $.generateKey
                }
              );
            };

            const exercises = [];
            // fill up array with the created quiz configs
            for (var i = 0; i < builderData.length; i++) {
              exercises.push(
                {
                  // "key": "quiz" + i,
                  "key": (i + 1),
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

            // get all the generated versions and render each of the quiz configs
            const versions = await this.store_generator.store.get();
            for (var i = 0; i < versions.length; i++) {
              await this.store_generator.store.set(
                {
                  "key": versions[i].key,
                  "configs": exercises,
                  "results": [],
                  "studentid": null
                }
              );
            };

            // inform user
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

            // attach the generated keys to html container
            this.element.querySelector("#generated-ids").innerHTML = html;

            // inform user
            window.alert("Scroll down to see a list of generated exam ids. Give one to every exam participant so they will be allowed to unlock an exam with it.");
          };

        };

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
