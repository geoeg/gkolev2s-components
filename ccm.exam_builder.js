/**
 * @overview ccm component for building exams
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 *
 */

(() => {

  "use strict";

  const component = {

    /*** component's name ***/
    name: 'exam_builder',

    /*** used ccm-framework ***/
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /*** component config ***/
    config: {

      /*** html-Structure ***/
      html: {

        // TOPBAR section:
        topbar: {

          // topbar main div container
          tag: "div",
          class: "topbar",
          inner: [
            // h-brs logo
            {
              tag: "img",
              id: "hbrs-logo",
              src: "resources/hbrs-logo.svg",
              width: "300rem",
              height: "auto"
            },
            // builder title
            {
              tag: "h1",
              id: "builder-title",
              inner: "Exam-Builder"
            },
            {
              tag: "hr"
            },
            // additional buttons for easy work with saved data
            {
              tag: "div",
              id: "data-btns",
              inner: [
                {
                  tag: "button",
                  class: "btn btn-primary",
                  inner: "get current saved data",
                  title: "get current data on lvl-2 in console",
                  onclick: "%get%"
                },
                {
                  tag: "button",
                  class: "btn btn-primary",
                  inner: "delete all saved data!",
                  title: "delete all saved data on lvl-2 (check console)",
                  onclick: "%del%"
                }
              ]
            }

          ]

        },

        // EXAM INFO FORM section:
        info: {

          tag: "div",
          class: "info",
          inner: [
            {
              tag: "hr"
            },
            {
              // info form section
              tag: "div",
              id: "info-form",
              inner: []
            },
            {
              // submit button for savind the data from info form
              tag: "div",
              id: "info-btns",
              inner: [
                {
                  tag: "button",
                  class: "btn btn-primary",
                  inner: "Submit",
                  title: "submit info form on datastore",
                  onclick: "%set%"
                },
              ]
            }

          ]
        },

        // (add/remove) QUIZ FORM Btns section:
        btns: {

          tag: "div",
          id: "quiz-form-btns",
          inner: [
            {
              tag: "hr"
            },
            {
              tag: "button",
              class: "btn btn-primary",
              inner: "+ Quiz",
              title: "add new quiz form",
              onclick: "%add%"
            },
            {
              tag: "button",
              class: "btn btn-primary",
              inner: "- Quiz",
              title: "remove quiz form",
              onclick: "%remove%"
            }
          ]
        },

        // QUIZ FORM section:
        forms: {

          tag: "div",
          id: "quiz-forms",
          inner: [
            {
              tag: "hr"
            },
            {
              // quiz form section
              tag: "div",
              id: "quiz-form",
              inner: []
            },
            {
              // submit button for savind the data from info form
              tag: "div",
              id: "form-btns",
              inner: [
                {
                  tag: "button",
                  class: "btn btn-primary",
                  inner: "Submit",
                  title: "submit quiz form on datastore",
                  onclick: "%set%"
                }
              ]
            }
          ]
        }

      },

      /*** ccm-Components ***/

      // add submit component
      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],

      // Ask: Do I really need the logger?
      logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],

      // on finish actions (called with $.onFinish())
      onfinish: {
        alert: "Form data saved successfully on datastore lvl-2!"
      },

      /*** ccm-Datastores ***/

      // create db lvl-1 (lost after reload)
      store: [ "ccm.store" ],

      // create db lvl-2 (IndexedDB)
      // Ask: Where here can I add a key? !DONT CHANGE NAME!
      store2: [ "ccm.store", { name: "data-level-2" } ],

      // create db lvl-2 (IndexedDB - using datasets.js)
      // Ask: How to use store_js with key and local file
      store_js: {
        store: [ "ccm.store",  "resources/datasets.js" ],
        // store: [ "ccm.store", { name: "name", url: "resources/datasets.js" } ],
        // key: "quiz_settings" // Ask: Why do I need the key here?
      },

      /*** css resources ***/
      css: ["ccm.load",
      "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
      { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
        "resources/default.css"
      ],

    },

    Instance: function () {

      let $;

      // init is called once after all dependencies are solved and is then deleted
      this.init = async () => {

        // set shortcut to helper function
        $ = this.ccm.helper;

        // log helpers
        console.log("---> ccm.helper.functions:");
        console.log($);
        console.log("---> components instance:");
        console.log(this);

      };

      this.start = async () => {

        // get initial form values
        // let data = await $.dataset( this.store2 );

        // logging of "start" event
        // this.logger && this.logger.log( "start", $.clone( data ) );
        // Ask: Why not using directly logger.log()?
        // this.logger.log( "start" );

        // section topbar logo, title
        const topbar = $.html( this.html.topbar, {

          get: async () => {
            // log current data saved at lvl-1
            console.log("---> data at lvl-1:");
            console.log(await this.store.get());
            // log current data saved at lvl-2
            console.log("---> data at lvl-2:");
            console.log(await this.store2.get());
            // log current data saved at lvl-2
            console.log("---> data at lvl-2 (.js):");
            console.log(await this.store_js.store.get());
            // log current values of forms
            console.log("---> current forms values: (1. General exam info; 2. Quiz questions and answers)");
            console.log(submitInfoInst.getValue());
            console.log(submitFormInst.getValue());
          },

          del: async () => {
            // delete all store data
            let storeCurrent = await this.store2.get();
            for (var i = 0; i < storeCurrent.length; i++) {
              this.store2.del(storeCurrent[i].key);
            }

            // log current values of submit_quiz form after removing the it
            console.log("---> data deleted.");
            console.log(await this.store2.get());
          },

        });

        // Submit Config: 'Info Form'
        const submitInfoConfig = {
          // old way of loading
          // "entries": [ "ccm.get", "../../gkolev2s/akless-components/akless-components/submit/resources/datasets.js", "gkolev2s_infoform.data" ],
          "entries": [ "ccm.get", "resources/submit_resources/datasets.js", "gkolev2s_infoform.data" ],
          "data": {
            // old way of loading
            // "store": [ "ccm.store", "../../gkolev2s/akless-components/akless-components/submit/resources/datasets.js" ],
            "store": [ "ccm.store", "resources/submit_resources/datasets.js" ],
            "key": "gkolev2s_infoform_init"
          },
          "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
          "onfinish": {
            "store": true,
            "alert": "Exam info saved!"
          }
        };
        // create, start and append submit instance for 'Info Form' to html structure
        const submitInfoInst = await this.submit.instance(submitInfoConfig);
        const submitInfoRes = await submitInfoInst.start();

        // section general exam info
        const info = $.html( this.html.info, {

          // set info form values to the datastores
          set: async () => {

            let results = submitInfoInst.getValue();
            // save current values at datastore lvl-1
            await this.store.set(
              { key: "info-settings", values: results}
            );
            // save current values at datastore lvl-2
            await this.store2.set(
              { key: "info-settings", values: results}
            );

            // log current data saved at lvl-1
            console.log("---> data stored at lvl-1:");
            console.log(await this.store.get());
            // log current data saved at lvl-2
            console.log("---> data stored at lvl-2:");
            console.log(await this.store2.get());
            // log current values of submit_quiz form
            console.log("---> current form values:");
            console.log(submitInfoInst.getValue());

            $.onFinish(
              this // runs the "onfinish" section from components config
              // console.log("some other functions"); // other func may be added here (add ,)
            );
          },
        });

        // Submit Config: 'Quiz Form'
        const submitFormConfig = {
          // old way of loading
          // "entries": [ "ccm.get", "../../gkolev2s/akless-components/akless-components/submit/resources/datasets.js", "gkolev2s_quizform.data" ],
          "entries": [ "ccm.get", "resources/submit_resources/datasets.js", "gkolev2s_quizform.data" ],
          "data": {
            // old way of loading
            // "store": [ "ccm.store", "../../gkolev2s/akless-components/akless-components/submit/resources/datasets.js" ],
            "store": [ "ccm.store", "resources/submit_resources/datasets.js" ],
            "key": "gkolev2s_quizform_init"
          },
          "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
          "onfinish": {
            "store": true,
            "alert": "Quiz saved!"
          }
        };
        // create and start submit 'quiz form' to html structure
        const submitFormInst = await this.submit.instance(submitFormConfig);
        const submitFormRes = await submitFormInst.start();

        // section with buttons to add/del quiz form
        const btns = $.html( this.html.btns, {

          add: async () => {
            // add quiz form
            // create new <div> for the form
            const newForm = document.createElement("div");
            // set id to the new <div>
            newForm.id = "test-id";
            // append the new <div> to the html structure
            this.element.querySelector("#quiz-form").appendChild(newForm);
            // append 'quiz form' to the new <div>
            this.element.querySelector("#test-id").appendChild(submitFormInst.root);
          },

          remove: async () => {
            // remove quiz form
            parent = this.element.querySelector("#quiz-form");
            if (parent.hasChildNodes()) {
              parent.removeChild(parent.lastChild);
            };

            // log current values of submit_quiz form after removing the it
            console.log("---> form removed.");
          }
        });

        // section with quiz form
        const forms = $.html( this.html.forms, {

          set: async () => {
            let results = submitFormInst.getValue();
            // save current values at datastore lvl-1
            await this.store.set(
              {
                key: "quiz-settings",
                questions: results.questions,
                start_button: results.start_button,
                feedback: results.feedback,
                navigation: results.navigation,
                skippable: results.skippable,
                finish_anytime: results.finish_anytime,
                shuffle_quest_answ: results.shuffle_quest_answ
              }
            );
            // save current values at datastore lvl-2
            await this.store2.set(
              {
                key: "quiz-settings",
                questions: results.questions,
                start_button: results.start_button,
                feedback: results.feedback,
                navigation: results.navigation,
                skippable: results.skippable,
                finish_anytime: results.finish_anytime,
                shuffle_quest_answ: results.shuffle_quest_answ
              }
            );
            await this.store_js.store.set(
              {
                key: "quiz-settings",
                questions: results.questions
              }
            );

            // log current data saved at lvl-1
            console.log("---> data stored at lvl-1:");
            console.log(await this.store.get());
            // log current data saved at lvl-2
            console.log("---> data stored at lvl-2:");
            console.log(await this.store2.get());
            // log current data saved at lvl-2 (.js)
            console.log("---> data stored at lvl-2:");
            console.log(await this.store_js.store.get());
            // log current values of submit_quiz form
            console.log("---> current form values:");
            console.log(submitFormInst.getValue());

            $.onFinish(
              this // runs the "onfinish" section from components config
              // console.log("some other functions"); // other func may be added here (add ,)
            );
          }

        });

        // render the sections to the given in config html structure
        $.setContent( this.element, [ topbar, info, btns, forms ] );
        // append 'info-form' to the html structure
        this.element.querySelector("#info-form").appendChild(submitInfoInst.root);

        /******************* Ignore: Code experiments ******************/

        // generate unique id for added exercise
        // Quelle: https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
        let createId = () => {
          return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
          );
        };

        // Experiment: Create generator:
        console.log("-----------------------------------------------");

        // get data from store2 (lvl-2)
        let quizOrigin = await this.store2.get("quiz-settings");
        // let shuffleOption = quizOrigin.shuffle_quest_answ;
        let shuffleOption = true;

        // clone all quiz data
        let dataCopy = $.clone(quizOrigin);
        console.log("---> cloned data:");
        console.log(dataCopy);

        // get just the questions
        let questOrigin = dataCopy.questions;
        console.log(questOrigin[0].answers);

        // Create a matrix out of array
        // Quelle: https://stackoverflow.com/questions/4492385/how-to-convert-simple-array-into-two-dimensional-array-matrix-with-javascript
        const toMatrix = (arr, width) =>
          arr.reduce((rows, key, index) => (index % width == 0 ?
            rows.push([key]) : rows[rows.length-1].push(key)) && rows, []);

        let questMatrix = toMatrix(questOrigin, questOrigin.length);
        console.log("---> created matrix:");
        console.log(questMatrix);

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

        await createVersion(questOrigin, questMatrix, 10);
        console.log("---> result after pushing the new array to the matrix:");
        console.log(questMatrix);

        /**
         * Comparing one of the versions of the original with the original to get exact
         * @param {array} arrOrigin array with original values
         * @param {array} arrVersion array to be compared with original
         * @param
         * @return
         */
        // let compareToOriginal = (parent, child, childVersion) => {
        //
        //    parent[0][i]
        //
        //
        // };

        console.log("----------------------------------------------");

        //
        // TODO: Shuffle questions! --- done.
        // TODO: Shuffle answers! --- done.
        // TODO: Set unique-id when shuffling the array! --- no needed? instead of that:
        // TODO: Compare function!

        // Ask: How to edit "submit" function of submit component? So that I can add the code from above somehow?
        // Ask: How to generate "appid" from the given data? Insert my exam_builder.js into App_builder?
        // Ask: How to start app_builder and import properly my component?
        /*******************************************/

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
