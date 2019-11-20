/**
 * @overview ccm component for unlocking exam version
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
    name: 'exam_unlocker',

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
              id: "unlocker-title",
              inner: "Exam-Unlocker"
            },
            {
              tag: "div",
              id: "data-btns",
              inner: []
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

        },

        // task: {
        //   tag: "div",
        //   class: "task",
        //   inner: [
        //     { tag: 'hr' },
        //     { tag: "h2", inner: "Exercise %nr%: %title% (%points% pts.)" },
        //     { class: "task", "data-type": "%type%", id: "task_%nr%" }
        //   ]
        // }

      },

      /**
       * used ccm components
       */
      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],

      quiz: [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.0.js" ],

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

      store_unlocker: {
        store: [ "ccm.store", { name: "gkolev2s_exam_unlocker", url: "https://ccm2.inf.h-brs.de" } ],
      },

      store_students: {
        store: [ "ccm.store", { name: "gkolev2s_exam_students", url: "https://ccm2.inf.h-brs.de" } ],
      },

      store_results: {
        store: [ "ccm.store", { name: "gkolev2s_exam_results", url: "https://ccm2.inf.h-brs.de" } ],
      },

      /**
       * css resources
       */
      css: ["ccm.load",
        "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
          "./resources/default.css"
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
        this.logger.log( "start-exam-unlocker" );

        console.log("---> generated exams:");
        console.log(await this.store_generator.store.get());

        // get student ids that are allowed to unlock (participate) an exam
        let allowedStudents = await this.store_students.store.get("allowed_ids");

        const form = $.html( this.html.form, {});

        // submit config for 'exam-unlocker's form
        const submitConfig = {
          "entries": [ "ccm.get", "./resources/datasets.js", "gkolev2s_unlocker.data" ],
          "data": {
            "store": [ "ccm.store", "./resources/datasets.js" ],
            "key": "gkolev2s_unlocker_init"
          },
          "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
          "onfinish": {
            "log": true,
            callback: async () => {
              await authentification()
            }
          },

        };

        // create and start the submit instance to html structure
        const submitInstance = await this.submit.instance(submitConfig);
        const submitResult = await submitInstance.start();

        // render the sections to the given in config html structure
        $.setContent( this.element, [ form ] );
        // append submit form to the html structure
        this.element.querySelector("#unlock-form").appendChild(submitInstance.root);

        // authentification's logic
        let authentification = async () => {

          // get data from unlocker's form
          let key = submitInstance.getValue().password;
          let studentid = submitInstance.getValue().studentid;
          console.log(`Looking for key: ${key}, studentid: ${studentid}.`);

          // get the exam's configuration that will be loaded
          let configToLoad = await this.store_generator.store.get(key);

          if (configToLoad == null)  {
            window.alert(`The password ${examId} is wrong! Try again.`);
          };

          // get already unlocked exams
          let unlockedExams = await this.store_unlocker.store.get();
          let usedExamKeys = [];
          for (var i = 0; i < unlockedExams.length; i++) {
            usedExamKeys.push(unlockedExams[i].key);
          }
          console.log("--- already unlocked exams:");
          console.log(usedExamKeys);

          // check if the exam key has been already used
          if (usedExamKeys.includes(configToLoad.key)) {
            window.alert(`${configToLoad.key} has been already used once.`);

          } else {

            let expectedStudent = null;
            // check if the student with that studentid is allowed to write the exam
            for (let i = 0; i < allowedStudents.value.length; i++) {
              if (allowedStudents.value[i] == studentid) {
                expectedStudent = allowedStudents.value[i];
              };
            };

            // if the student is allowed to participate an exam
            // and the exam key is not used - load the exam; else - try again
            if ( ( studentid == expectedStudent ) && (key.localeCompare(configToLoad.key) == 0) ) {

              $.onFinish(
                this,
                window.alert(`Exam Nr. ${key} has been unlocked successfully. Click "OK" to start.`),
                storeUnlocked(key, studentid),
                blockSecondAttempt(key, studentid),
                startExam(key, studentid)
              );

            } else {

              $.onFinish(
                this,
                window.alert(`The password: ${key} is wrong or the student id: ${studentid} already participated the exam. Please try again.`),
              );

            }

          };

        };

        let startExam = async ( examId, studId ) => {

          // get the config with specific key from stored exams on datastore lvl-3
          const examToLoad = await this.store_generator.store.get(examId);
          console.log("--- exam to load:");
          console.log(examToLoad);

          const quizConfigsToLoad = examToLoad.configs;
          console.log("--- configs to load:");
          console.log(quizConfigsToLoad);

          // remove the submit (unlocker) form
          this.element.querySelector("#unlock-form").removeChild(submitInstance.root);

          // create array with results for each student
          let examResults = [];
          // apply changes on onfinish() of each quiz
          for (let i = 0; i < quizConfigsToLoad.length; i++) {
            quizConfigsToLoad[i].onfinish.store.key = examToLoad.key + examToLoad.configs[i].key;
            // ignore: experimenting with onfinish:
            // quizConfigsToLoad[i].onfinish.store.name = "gkolev2s_exam_results_" + studId;
            quizConfigsToLoad[i].onfinish.callback = function (instance, results) {
              examResults.push({
                "studId": studId,
                "examId": examId,
                "quizId": instance.id,
                "results": results
              });
            };
          };

          // iterate over the configs and render as many as needed quizes
          for (let i = 0; i < quizConfigsToLoad.length; i++) {
            const quizInstance = await this.quiz.instance(quizConfigsToLoad[i]);
            const quizResult = await quizInstance.start();
            this.element.querySelector("#unlock-form").appendChild(quizInstance.root);
          };
          // TODO: render general exam information
          const storeEditor = await this.store_editor.store.get();
          this.element.querySelector("#unlocker-title").innerHTML = storeEditor[0].subject;

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

  // create custom element and start the component
  // Quelle: AKless-components; MKaul-components
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
