/**
 * @overview ccm component for generating exams
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 *
 * Done: Generator form (incl. Shuffling the Q&A)
 * Done: On submitting: save the generated configs on datastore lvl-3 with unique keys
 * Done: On submitting: save the general exam info as separate object on datastore lvl-3
 * TODO: Block already unlocked exams and used student ids
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

        // TODO no need if loading the generator after submitting the data in exam_builder (there is already a topbar)
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
            {
              tag: "hr"
            },
            {
              tag: "div",
              id: "data-btns",
              inner: [
                {
                  tag: "button",
                  class: "btn btn-primary",
                  inner: "get current saved data",
                  title: "get current data (check console)",
                  onclick: "%get%"
                },
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
      store: [ "ccm.store" ],

      store_js: {
        store: [ "ccm.store",  "../exam_builder/resources/datasets.js" ],
      },

      // db lvl-2 (IndexedDB)
      store2: [ "ccm.store", { name: "data-level-2" } ],

      // db lvl-3 (hbrs-Server)
      store_builder: {
        store: [ "ccm.store", { name: "gkolev2s_exam_builder", url: "https://ccm2.inf.h-brs.de" } ],
      },

      store_generator: {
        store: [ "ccm.store", { name: "gkolev2s_exam_generator", url: "https://ccm2.inf.h-brs.de" } ],
      },

      store_unlocker: {
        store: [ "ccm.store", { name: "gkolev2s_exam_unlocker", url: "https://ccm2.inf.h-brs.de" } ],
      },

      store_results: {
        store: [ "ccm.store", { name: "gkolev2s_exam_results", url: "https://ccm2.inf.h-brs.de" } ],
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

        // get current date and time for logging the start
        const today = new Date();
        const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
        const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        const logDateTime = (date, time) => { return date + "/" + time };

        // logging of "start" event
        this.logger.log( "start-exam-generator", logDateTime(date, time) );

        // section topbar logo, title
        const topbar = $.html( this.html.topbar, {});

        // Submit Config: 'Exam-Generator form'
        // TODO: update submit form
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
          get: async () => {
            console.log("---> data at lvl-1:");
            console.log(await this.store.get());
            console.log("---> data at lvl-2:");
            console.log(await this.store2.get());
            console.log("---> data at lvl-3 (builder)");
            console.log(await this.store_builder.store.get());
            console.log("---> data at lvl-3 (generator)");
            console.log(await this.store_generator.store.get());
            console.log("---> data at lvl-3 (unlocker)");
            console.log(await this.store_unlocker.store.get());
            console.log("---> data at lvl-3 (results)");
            console.log(await this.store_results.store.get());
          },
        });

        // render the sections to the given in config html structure
        $.setContent( this.element, [ topbar, generator ] );
        // append 'generator-form' to the html structure
        this.element.querySelector("#generator-form").appendChild(submitInstance.root);

        // generate new exams and save those in matrix
        let generate = async () => {

          // get data form "Exam ID" field
          let examId = submitInstance.getValue().exam_id;
          // get amount for exams to create
          let amount = submitInstance.getValue().amount;
          // get shuffle option
          let shuffleOption = submitInstance.getValue().shuffle;

          // get data from store2 (lvl-2)
          // let quizOrigin = await this.store2.get([examId]);
          let quizOrigin = await this.store_builder.store.get(examId);

          if (quizOrigin == null) {
            window.alert(`The exam ID: ${examId} is wrong. Please try again.`);
          } else {
            // get the original questions
            let questOrigin = quizOrigin.quiz[0].questions;

            /**
             * create a matrix out of array
             * Quelle: https://stackoverflow.com/questions/4492385/how-to-convert-simple-array-into-two-dimensional-array-matrix-with-javascript
             */
            const toMatrix = (arr, width) =>
            arr.reduce((rows, key, index) => (index % width == 0 ? rows.push([key]) : rows[rows.length-1].push(key)) && rows, []);

            // create matrix with [0][i] original questions
            let questMatrix = toMatrix(questOrigin, questOrigin.length);

            /**
            * Copy values, shuffle those and add as new row in the matrix.
            * @param {array} arrOrigin array with original values (e.g. original questions)
            * @param {array} arrMatrix multidimensional array with the original values (arrMatrix[0][i]), where 'i' is the question number and new created versions of original values (arrMatrix[x][y]), where 'x' is the version number and 'y' is the question's current position in array
            * @param {integer} amount copies of original values to be done
            * @return {void}
            */
            const createVersion = (arrOrigin, arrMatrix, amount) => {
              for (let i = 0; i < amount; i++) {
                let arrCopy = $.clone(arrOrigin);

                if (shuffleOption) {
                  // shuffle questions
                  arrCopy = $.shuffleArray(arrCopy);
                  // shuffle answers of each question
                  for (var j = 0; j < arrCopy.length; j++) {
                    arrCopy[j].answers = $.shuffleArray(arrCopy[j].answers);
                  }
                };
                // add new array with shuffled Q&A to the matrix
                arrMatrix.push(arrCopy);
              }
            };

            await createVersion(questOrigin, questMatrix, amount);

            // Experimenting..
            let configsArr = [];
            configsArr.push(quizOrigin);

            for (let i = 1; i < questMatrix.length; i++) {
              let quizOriginCopy = $.clone(quizOrigin);
              quizOriginCopy.quiz[0] = questMatrix[i];
              quizOriginCopy.key = $.generateKey();
              configsArr.push(quizOriginCopy);
            };

            // get data from submit form
            let resultsQuiz = quizOrigin.quiz[0];
            let defaultCss = await this.store_js.store.get("demo");

            // get creators signature
            let creatorSignature = quizOrigin.key;

            // store exam information
            await this.store_generator.store.set(
              {
                // TODO generate key from the login data of user (exam creator)
                "key": creatorSignature + "_exam_info",
                "subject": quizOrigin.subject,
                "date": quizOrigin.date,
                "time": quizOrigin.time,
                "textarea": quizOrigin.textarea
              }
            );

            for (var i = 1; i < configsArr.length; i++) {
              // store original quiz config
              await this.store_generator.store.set(
                {
                  "key": configsArr[i].key,
                  "questions": configsArr[i].quiz[0],
                  "feedback": quizOrigin.quiz[0].feedback,
                  "navigation": quizOrigin.quiz[0].navigation,
                  "start_button": quizOrigin.quiz[0].start_button,
                  "placeholder": {
                    "start": quizOrigin.quiz[0].start_label,
                    "prev": quizOrigin.quiz[0].previous_label,
                    "next": quizOrigin.quiz[0].next_label,
                    "submit": quizOrigin.quiz[0].submit_label,
                    "finish": quizOrigin.quiz[0].finish_label
                  },
                  // "placeholder.finish": "Finish",
                  "onfinish": {
                    "log": true,
                    "restart": false,
                    "store": {
                      "settings": {
                        "name": "gkolev2s_exam_results",
                        "url": "https://ccm2.inf.h-brs.de"
                      }
                      // key
                    },
                    "alert": "Configurations, you've finished the quiz successfully!",
                  },
                  "css": defaultCss.css
                }
              );

            };

          window.alert(`Exam versions generated successfully!`);
        };

      };

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
