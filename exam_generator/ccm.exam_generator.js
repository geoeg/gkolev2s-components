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

    name: 'exam_generator',

    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.5.js',

    config: {

      html: {

        topbar: {

          tag: "div",
          class: "topbar",
          inner: [
            // {
            //   tag: "img",
            //   id: "hbrs-logo",
            //   src: "resources/hbrs-logo.svg",
            //   width: "300rem",
            //   height: "auto"
            // },
            {
              tag: "h1",
              id: "generator-title",
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

      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],

      logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],

      store: [ "ccm.store" ],

      types: {
       store: [ "ccm.store", "https://geoeg.github.io/gkolev2s-components/exam_generator/resources/type.js" ],
     },

      css: ["ccm.load",
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
        "https://geoeg.github.io/gkolev2s-components/exam_generator/resources/default.css"
      ],
    },

    Instance: function () {

      let $;

       this.init = async () => {

        $ = this.ccm.helper;

      };

      this.start = async () => {

        this.logger.log( "start-exam-generator" );

        const topbar = $.html( this.html.topbar, {});

        // submit config for 'exam-generators's form
        const submitConfig = {
          // TODO: change file path to github.io..
          "entries": [ "ccm.get", "https://geoeg.github.io/gkolev2s-components/exam_generator/resources/datasets.js", "generator.data" ],
          "data": {
            // TODO: change file path to github.io..
            "store": [ "ccm.store", "https://geoeg.github.io/gkolev2s-components/exam_generator/resources/datasets.js" ],
            "key": "generator_init"
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
          let amount = submitInstance.getValue().amount;

          let keysToShowAtEnd = [];

          // get the original exam data
          let originalExamData = await this.store_settings.editor.store.get(examId);

          // if an exam with that id is existing on the server/exam_editor
          if (isExisting(originalExamData)) {

            // create amount of variations with unique key, that will be used to unlock exact this exam
            for (let nr = 0; nr < amount; nr++) {
              keysToShowAtEnd.push( $.generateKey() );
              await this.store_settings.generator.store.set(
                // { "key": $.generateKey() });
                { "key": keysToShowAtEnd[nr] });
            };

            // copy the exercises to be able to manipulate
            let builderData = [...originalExamData.exercises];
            // store generated configs here
            let generatedExcConfigs = [];

            // for each type of exercise
            for (var i = 0; i < builderData.length; i++) {
              // get the needed config template
              let storedTemplate = await this.types.store.get(builderData[i].type);

              // fill up the templates with current data from the original exam
              let filledTemplate = await $.integrate( builderData[i], storedTemplate.config );
              filledTemplate.key = builderData[i].type + i;
              filledTemplate.onfinish = await $.integrate( storedTemplate.onfinish, filledTemplate.onfinish );
              filledTemplate.onfinish.store.key = builderData[i].type + i;

              // save all filled templates at one place
              generatedExcConfigs.push(filledTemplate);
            };

            // for every generated version add the shuffled generated configs
            let versions = await this.store_settings.generator.store.get();
            for (var i = 0; i < versions.length; i++) {

             // the order of the exercises will be shuffled for security
             let clonedConfigs = [...generatedExcConfigs];
             $.shuffleArray(clonedConfigs);
             // save each shuffled generated exam structure to the generated exam variations with unique id
             await this.store_settings.generator.store.set(
               {
                "key": versions[i].key,
                "parent": examId,
                "configs": clonedConfigs,
                "results": [],
                "studentid": null
               }
             );
            };

            window.alert(`Exam versions were generated successfully!`);

            /**
             * create html table with generated ids and show those on page (LOC: 307-321)
             * Quelle: https://code-boxx.com/create-table-from-array-javascript/
             */
            let perrow = 1;
            let html = "<table><caption>Generated Exam Keys:</caption><tr>";
            for (var i = 0; i<keysToShowAtEnd.length; i++) {
              html += "<td>" + keysToShowAtEnd[i] + "</td>";
              // Break into next row
              var next = i+1;
              if (next%perrow==0 && next!=keysToShowAtEnd.length) {
                html += "</tr><tr>";
              }
            }
            html += "</tr></table>";

            // attach the generated keys to the html container
            this.element.querySelector("#generated-ids").innerHTML = html;

            // inform user
            window.alert("Scroll down to see a list of generated exam ids. Give one to every exam participant so they will be allowed to unlock an exam with it.");

          } else {
            window.alert("No such exam found. Please try again.");
          };

        };

      };

    }

  };

  // create custom element and start the component
  // Quelle: AKless-components; MKaul-components
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
