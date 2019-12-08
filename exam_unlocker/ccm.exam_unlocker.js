/**
 * @overview ccm component for unlocking exam version and participating an exam
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 * @version 1.0.0
 * - unlocking exam by adding the exam key and adding a student id
 * - exams to be unlocked are read from the generator storage (check config file - storage_settings)
 * - student ids allowed to participate an exam are read from the student storage (check config file - storage_settings)
 * - unlocked exam and student id are blocked after unlocking successfully a variation and the pair is stored in the unlocker storage (check config file - storage_settings)
 * - answers of the exam are saved in a results storage after finishing the exercises (check config file - storage_settings)
 */

(() => {

  "use strict";

  const component = {

    /**
     * unique component name and version
     */
    name: 'exam_unlocker',

    // version: [1, 0, 0],

    /**
     * recommended used framework version
     */
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.5.js',

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
              src: "https://geoeg.github.io/gkolev2s-components/exam_unlocker/resources/hbrs-logo.svg",
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
              id: "exam-info",
              inner: [
                {
                  tag: "h4",
                  id: "date",
                  inner: []
                },
                {
                  tag: "h4",
                  id: "begin",
                  inner: []
                },
                {
                  tag: "h4",
                  id: "info",
                  inner: []
                }
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

        },

      },

      /**
       * used ccm components
       */
      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],

      logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],

      /**
       * css resources
       */
      css: ["ccm.load",
        "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
          "https://geoeg.github.io/gkolev2s-components/exam_unlocker/resources/default.css"
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

        // get student ids that are allowed to unlock (participate) an exam
        let allowedStudents = await this.store_settings.students.store.get("allowed_ids");

        const form = $.html( this.html.form, {});

        // submit config for 'exam-unlocker's form
        const submitConfig = {
          "entries": [ "ccm.get", "https://geoeg.github.io/gkolev2s-components/exam_unlocker/resources/datasets.js", "unlocker.data" ],
          "data": {
            "store": [ "ccm.store", "https://geoeg.github.io/gkolev2s-components/exam_unlocker/resources/datasets.js" ],
            "key": "unlocker_init"
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
          let configToLoad = await this.store_settings.generator.store.get(key);

          if (configToLoad == null)  {
            window.alert(`The password ${examId} is wrong! Try again.`);
          };

          // get already unlocked exams
          let unlockedExams = await this.store_settings.unlocker.store.get();
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
          const examToLoad = await this.store_settings.generator.store.get(examId);
          const configsToLoad = examToLoad.configs;

          // get general exam information
          const storeEditor = await this.store_settings.editor.store.get(examToLoad.parent);

          // remove the submit (unlocker) form
          this.element.querySelector("#unlock-form").removeChild(submitInstance.root);

          // apply changes on onfinish() of each exercise
          for (let i = 0; i < configsToLoad.length; i++) {

            configsToLoad[i].onfinish.store.key = [examToLoad.key + "_" + examToLoad.configs[i].key, studId];
            configsToLoad[i].onfinish.store.settings.name = storeEditor._.creator + "_exam_results";

            // possible ways to save exam results in the future:
            // configsToLoad[i].onfinish.store.settings.name = "gkolev2s_" + studId;
            // configsToLoad[i].onfinish.store.settings.name = studId + "_" + examId;
          };

          // iterate over the configs and render as many as needed exercises
          for (let i = 0; i < configsToLoad.length; i++) {
            const exInstance = await this.ex_types[configsToLoad[i].type].instance(configsToLoad[i]);
            const exResults = await exInstance.start();

            // possible way to render exercise group title
            // if ( configsToLoad[i].hasOwnProperty("group_title") ) {
            //   let h3 = document.createElement("h3");
            //   h3.textContent = configsToLoad[i].group_title;
            //   this.element.querySelector("#unlock-form").appendChild(h3);
            // };

            this.element.querySelector("#unlock-form").appendChild(exInstance.root);
          };

          // render general exam information
          this.element.querySelector("#unlocker-title").innerHTML = storeEditor.subject;
          this.element.querySelector("#date").innerHTML = "Date: " + storeEditor.date;
          this.element.querySelector("#begin").innerHTML = "Begin: " + storeEditor.time;
          this.element.querySelector("#info").innerHTML = "Information: " + storeEditor.examinfo;
        };

        /**
         * block the student id and the exam id that were just used to unlock an exam
         */
        let blockSecondAttempt = async ( examId, studId ) => {

          for (var i = 0; i < allowedStudents.value.length; i++) {
            allowedStudents.value = allowedStudents.value.filter(item => item !== studId);
          };

          await this.store_settings.students.store.set(
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

          await this.store_settings.unlocker.store.set(
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
