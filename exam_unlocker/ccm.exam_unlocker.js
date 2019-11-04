/**
 * @overview ccm component for opening a locked exam
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 *
 * Done: Unlock exam form
 * Done: StudentId is compared to specific array with student ids
 * TODO: Get student ids data from sis update the array
 * Done: Password is protected
 * Done: Password and studentId are checked
 * Done: On submitting: Load different component
 * TODO: Load exam_reader
 * Done: Unlocked exam is saved on datstore lvl-3 together with the studentId + date and time of unlocking
 * TODO: Block exams and studentIds that have been already used
 * TODO: Map the unlocked exams with the results
 * TODO: Map the results with the original exam
 * TODO: Fix! Now using just the first added exercise. (If two quizes - second one is ignored)
 * TODO: ? Quiz: onfinish - Block user from getting back to the unlocker?
 */

(() => {

  "use strict";

  const component = {

    /**
     * unique component name
     */
    name: 'exam_unlocker',

    /**
     * recommended used framework version
     */
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

    /**
     * default instance configuration
     */
    config: {

      /*** html-Structure ***/
      html: {

        form: {

          tag: "div",
          class: "form",
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
              id: "title",
              inner: "Exam-Unlocker"
            },
            {
              tag: "hr"
            },
            // additional buttons for easy work with saved data
            // TODO: delete at the end
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
              tag: "div",
              id: "unlock-form",
              inner: []
            }
          ]

        }

      },

      /*** ccm-Components ***/

      // add submit component
      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],

      // test
      blank: [ "ccm.component", "https://ccmjs.github.io/akless-components/blank/ccm.blank.js" ],

      // test
      quiz: [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.0.js" ],

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
        this.logger.log( "start-exam-unlocker", logDateTime(date, time) );

        // section unlocker form
        const form = $.html( this.html.form, {
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

        // Submit Config: 'Exam-unlocker as one form'
        const submitConfig = {
          "entries": [ "ccm.get", "resources/datasets.js", "gkolev2s_unlocker.data" ],
          "data": {
            "store": [ "ccm.store", "resources/datasets.js" ],
            "key": "gkolev2s_unlocker_init"
          },
          "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
          "onfinish": {
            "log": true,
            callback: async () => {
              await auth()
            }
          },

        };

        // create, start and append submit instance for 'Unlock Form' to html structure
        const submitInstance = await this.submit.instance(submitConfig);
        const submitResult = await submitInstance.start();

        // render the sections to the given in config html structure
        $.setContent( this.element, [ form ] );
        // append 'unlock-form' to the html structure
        this.element.querySelector("#unlock-form").appendChild(submitInstance.root);

        // matrikelNr that are allowed to write the exam
        // TODO: get matrikelNr list from sis
        // TODO: put student ids on server
        let studentIds = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];

        /**
         * authentication logic
         */
        let auth = async () => {

          // get key (password) from the unlock form
          let key = submitInstance.getValue().password;
          // get matrikelNr from the unlock form
          let matrnr = submitInstance.getValue().matrikelnr;
          console.log(`Looking for key: ${key}, matrnr: ${matrnr}.`);

          // get the config with specific key from stored exam on datastore lvl-2
          let configToLoad = await this.store_generator.store.get(key);
          // if there is no such key --> inform the user
          console.log(configToLoad);
          if ( configToLoad == null ) {
            window.alert(`The password does not match! Try again.`);
          };
          // get the key
          let expected_key = configToLoad.key;
          let expected_matrnr = null;

          // check if the student with that matrnr is allowed to write the exam
          for (var i = 0; i < studentIds.length; i++) {
            if (studentIds[i] == matrnr) {
              expected_matrnr = studentIds[i];
            };
          };

          // if matrnr and password match - load the exam; else - try again
          if ( ( matrnr == expected_matrnr ) && (key.localeCompare(expected_key) == 0) ) {

            $.onFinish(
              this,
              window.alert(`Exam Nr. ${key} has been unlocked. Click "OK" to start.`),
              storeUnlocked(),
              blockAttempt(),
              startExam()
            );

          } else {

            $.onFinish(
              this,
              window.alert(`The password: ${key} is wrong or there is no match with the MatrikelNr ${matrnr}. Please try again.`),
            );

          }

        };

        /**
         * start the exam component
         * TODO: set exam_reader component
         */
        let startExam = async () => {

          // try to start quiz with one of created configs in exam_generator
          let key = submitInstance.getValue().password;
          const quizConfig = await this.store_generator.store.get(key);
          const quizInstance = await this.quiz.instance(quizConfig);
          const quizResult = await quizInstance.start();

          const storeGenerator = await this.store_generator.store.get();

          this.element.querySelector("#unlock-form").removeChild(submitInstance.root);
          this.element.querySelector("#unlock-form").appendChild(quizInstance.root);
          this.element.querySelector("#title").innerHTML = storeGenerator[0].subject;

        };

        /**
         * block the student id and the exam id that were just used to unlock an exam
         *
         */
        let blockAttempt = async () => {

          let examId = submitInstance.getValue().password;
          let matrNr = submitInstance.getValue().matrikelnr;

          studentIds = studentIds.filter(item => item !== matrNr);
          console.log("Student Ids left:");
          console.log(studentIds);

        };

        /**
         * store the unlocked exam and the student that unlocked it at exact time and date
         * TODO: save data on server
         */
        let storeUnlocked = async () => {

          let examId = submitInstance.getValue().password;
          let matrNr = submitInstance.getValue().matrikelnr;
          let today = new Date().toLocaleString();

          // TODO: save unlocker together with results
          await this.store_unlocker.store.set(
            {
              "key": examId,
              "unlocked":
              {
                "matrNr": matrNr,
                "dateTime": today,
              }
            }
          );

        };

        let updateUnlocked = async () => {



        };


      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
