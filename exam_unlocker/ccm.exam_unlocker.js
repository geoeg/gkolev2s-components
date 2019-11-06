/**
 * @overview ccm component for opening a locked exam
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
                {
                  tag: "button",
                  class: "btn btn-primary",
                  inner: "check ids",
                  title: "check student ids that are allowed to unlock an exam (check console)",
                  onclick: "%check%"
                },
                {
                  tag: "button",
                  class: "btn btn-primary",
                  inner: "reset ids",
                  title: "reset student ids (check console)",
                  onclick: "%reset%"
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

      store_students: {
        store: [ "ccm.store", { name: "gkolev2s_exam_students", url: "https://ccm2.inf.h-brs.de" } ],
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

        // logging of "start" event
        this.logger.log( "start-exam-unlocker" );

        // student ids that are allowed to write the exam
        // TODO: get student ids list from sis
        let allowedStudents = await this.store_students.store.get("allowed_ids");

        // section unlocker form
        const form = $.html( this.html.form, {
          // additional funtions to help working with data
          // will be deleted at the end
          get: async () => {
            console.log("---> data at lvl-3 (generator)");
            console.log(await this.store_generator.store.get());
            console.log("---> data at lvl-3 (unlocker)");
            console.log(await this.store_unlocker.store.get());
            console.log("---> data at lvl-3 (results)");
            console.log(await this.store_results.store.get());
          },

          check: async () => {
            let res = await this.store_students.store.get("allowed_ids");
            console.log("---> allowed students to unlock exam:");
            console.log(res.value);
          },

          reset: async () => {
            let studentIds = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
            await this.store_students.store.set(
              {
                key: "allowed_ids",
                value: studentIds
              }
            );

          }

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

        /**
         * authentication logic
         */
        let auth = async () => {

          // get key (password) from the unlock form
          let key = submitInstance.getValue().password;
          // get matrikelNr from the unlock form
          let studentid = submitInstance.getValue().studentid;
          console.log(`Looking for key: ${key}, studentid: ${studentid}.`);

          // get the config with specific key from stored exams on datastore lvl-3
          let configToLoad = await this.store_generator.store.get(key);
          // if there is no such key --> inform the user
          if ( configToLoad == null ) {
            window.alert(`The password is wrong! Try again.`);
          };

          // get already unlocked exams
          let unlockedExams = await this.store_unlocker.store.get();
          let usedExamKeys = [];
          for (var i = 0; i < unlockedExams.length; i++) {
            usedExamKeys.push(unlockedExams[i].key)
          };

          // check if the exam key has been already used
          if (usedExamKeys.includes(configToLoad.key)) {
            window.alert(`${configToLoad.key} has been already used.`);

          } else {

            let expectedStudent = null;

            console.log(allowedStudents);
            console.log(expectedStudent);
            // check if the student with that studentid is allowed to write the exam
            for (var i = 0; i < allowedStudents.value.length; i++) {
              if (allowedStudents.value[i] == studentid) {
                expectedStudent = allowedStudents.value[i];
              };
            };

            console.log(allowedStudents);
            console.log(expectedStudent);

            // if studentid and password match - load the exam; else - try again
            if ( ( studentid == expectedStudent ) && (key.localeCompare(configToLoad.key) == 0) ) {

              $.onFinish(
                this,
                window.alert(`Exam Nr. ${key} has been unlocked successfully. Click "OK" to start.`),
                storeUnlocked(key, studentid),
                blockSecondAttempt(key, studentid),
                startExam(key)
              );

            } else {

              $.onFinish(
                this,
                window.alert(`The password: ${key} is wrong or the student id: ${studentid} has beed already used. Please try again.`),
              );

            }

          };

        };

        /**
         * start the exam component
         * TODO: set exam_reader component
         */
        let startExam = async ( examId ) => {

          const quizConfig = await this.store_generator.store.get(examId);
          const quizInstance = await this.quiz.instance(quizConfig);
          const quizResult = await quizInstance.start();

          const storeBuilder = await this.store_builder.store.get();

          this.element.querySelector("#unlock-form").removeChild(submitInstance.root);
          this.element.querySelector("#unlock-form").appendChild(quizInstance.root);
          this.element.querySelector("#title").innerHTML = storeBuilder[0].subject;

        };

        /**
         * block the student id and the exam id that were just used to unlock an exam
         */
        let blockSecondAttempt = async ( examId, studId ) => {

          for (var i = 0; i < allowedStudents.value.length; i++) {
            allowedStudents.value = allowedStudents.value.filter(item => item !== studId);
          };

          await this.store_students.store.set(
            {
              "key": "allowed_ids",
              "value": allowedStudents.value
            }
          );

        };

        /**
         * store the unlocked exam and the student that unlocked it at exact time and date
         */
        let storeUnlocked = async ( examId, studId ) => {

          await this.store_unlocker.store.set(
            {
              "key": examId,
              "studentId": studId
            }
          );

        };

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
