/**
 * @overview ccm component for building an exam
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
    name: 'exam_editor',

    /**
     * recommended used framework version
     */
    // ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.5.js',
    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

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
              inner: "Exam-Editor"
            },
            {
              tag: "hr"
            },
            {
              tag: "div",
              id: "user-login",
              inner: []
            },
            {
              // button for starting the exam form
              tag: "button",
              class: "btn btn-primary btn-outline-dark",
              id: "start-btn",
              inner: "Start",
              title: "Start exam builder (user have to be logged in)",
              onclick: "%start%"
            },
            {
              tag: "hr"
            },
            {
              // additional buttons for easy work with saved data
              tag: "div",
              id: "data-btns",
              inner: [
                {
                  tag: "legend",
                  inner: "Admin panel"
                },
                {
                  tag: "button",
                  class: "btn btn-primary btn-sm btn-block",
                  inner: "Get currently saved exam data from the server",
                  title: "get current data (check console)",
                  onclick: "%get%"
                },
                {
                  tag: "button",
                  class: "btn btn-primary btn-sm btn-block",
                  inner: "!!! Del all saved exam data on server !!!",
                  title: "delete all saved data (check console)",
                  onclick: "%del%"
                },
                {
                  tag: "button",
                  class: "btn btn-primary btn-sm btn-block",
                  inner: "Get admin usernames and the student ids allowed to participate an exam",
                  title: "check student ids that are allowed to unlock an exam and the admins users for exam editor (check console)",
                  onclick: "%check%"
                },
                {
                  tag: "button",
                  class: "btn btn-primary btn-sm btn-block",
                  inner: "Reset the student ids",
                  title: "reset student ids (check console)",
                  onclick: "%reset%"
                },
                {
                  tag: "button",
                  class: "btn btn-secondary btn-sm btn-block",
                  inner: "Sort the saved results of exams",
                  title: "sort the submitted exam results (check console)",
                  onclick: "%sort%"
                },
                {
                  tag: "hr"
                },
              ]
            }

          ]

        },

        info: {

          tag: "div",
          class: "info",
          id: "info-section",
          inner: [

            {
              tag: "div",
              id: "info-form",
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

      user: [ 'ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js',
        [ 'ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','hbrsinfkaul' ] ],
        // [ 'ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','compact' ] ],

      /**
       * used ccm datastores
       */
      // TODO: delete
      // store_builder: {
      //   store: [ "ccm.store", { name: "gkolev2s_exam_builder", url: "https://ccm2.inf.h-brs.de" } ],
      // },
      store_editor: {
        store: [ "ccm.store", { name: "gkolev2s_exam_editor", url: "https://ccm2.inf.h-brs.de" } ],
      },

      store_admins: {
        store: [ "ccm.store", { name: "gkolev2s_exam_admins", url: "https://ccm2.inf.h-brs.de" } ],
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
       * own reference for inner functions
       */
      // const self = this;

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
        this.logger && this.logger.log( 'start-exam-editor' );

        // functionality of admin panel buttons (helpers for working with data)
        const topbar = $.html( this.html.topbar, {


          get: async () => {
            console.log("---> data at lvl-3 (editor)");
            console.log(await this.store_editor.store.get());
            console.log("---> data at lvl-3 (generator)");
            console.log(await this.store_generator.store.get());
            console.log("---> data at lvl-3 (unlocker)");
            console.log(await this.store_unlocker.store.get());
            console.log("---> data at lvl-3 (results)");
            console.log(await this.store_results.store.get());
          },

          del: async () => {
            let store3ECurrent = await this.store_editor.store.get();
            for (var j = 0; j < store3ECurrent.length; j++) {
              this.store_editor.store.del(store3ECurrent[j].key)
            };
            let store3GCurrent = await this.store_generator.store.get();
            for (var j = 0; j < store3GCurrent.length; j++) {
              this.store_generator.store.del(store3GCurrent[j].key)
            };
            let store3UCurrent = await this.store_unlocker.store.get();
            for (var j = 0; j < store3UCurrent.length; j++) {
              this.store_unlocker.store.del(store3UCurrent[j].key)
            };
            let store3RCurrent = await this.store_results.store.get();
            for (var j = 0; j < store3RCurrent.length; j++) {
              this.store_results.store.del(store3RCurrent[j].key)
            };
          },

          start: async () => {
            let userStatus = this.user.isLoggedIn();

            if (userStatus) {
              // if user is logged in -> only then allow "start" button to show submit form
              await changeVisibility(infoSection);
              let startBtn = this.element.querySelector("#start-btn");
              $.removeElement(startBtn);

              let admins = await this.store_admins.store.get();
              let userName = this.user.data().user;
              // if user == exact username (from admin list) -> only then show get/delete data buttons
              if (admins[0].value.includes(userName)) {
                await changeVisibility(btnsSection);
                console.log("Logged in user is an administrator.");
              } else {
                let btns = this.element.querySelector("#data-btns");
                $.removeElement(btns);
              };
            } else {
              // inform user if not logged in
              window.alert("Please login first.");
            };
          },

          check: async () => {
            let adminUsers = await this.store_admins.store.get("exam_editor_admins");
            console.log("---> exam editor admin users:");
            console.log(adminUsers.value);
            let res = await this.store_students.store.get("allowed_ids");
            console.log("---> allowed students to unlock exam:");
            console.log(res.value);
          },

          reset: async () => {
            let studentIds = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9017419 ];
            await this.store_students.store.set(
              {
                key: "allowed_ids",
                value: studentIds
              }
            );
          },

          // ignore:
          sort: async () => {
            const res = await this.store_results.store.get();
            let splitedResults = [];
            for (var i = 0; i < res.length; i++) {
              let tosplit = res[i].key;
              splitedResults.push(tosplit.split("quiz"));
            };
            console.log("---> splited exam result ids :");
            console.log(splitedResults);
          }

        });

        // generate unique key for the exam
        let configKey = $.generateKey();

        // submit config for 'exam-editor's form
        const submitConfig = {
          "entries": [ "ccm.get", "./resources/datasets.js", "gkolev2s.data" ],
          "data": {
            "store": [ "ccm.store", "./resources/datasets.js" ],
            "key": "gkolev2s_init"
          },
          "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
          "onfinish": {
            "log": true,
            "store": {
              "settings": {
                "name": "gkolev2s_exam_editor",
                "url": "https://ccm2.inf.h-brs.de"
              },
              "key": configKey
            },
            "alert": "Form data successfully saved!",
            callback: async () => {
             await getCurrentExamKey()
           },
           // render the exam_generator component when exam data is submitted
            // "render": {
              // component: "../exam_generator/ccm.exam_generator.js",
              // TODO: fix. Not rendering successfully.
              // Ask: do I need a config here? I load the standard version of the component that works without, but its just on loading.
              // config: {} // config of exam generator component
            // }
          }
        };

        // create and start the submit instance to html structure
        const submitInstance = await this.submit.instance(submitConfig);
        const submitResult = await submitInstance.start();

        // section exam info
        const info = $.html( this.html.info, {});

        // render the sections to the given in config html structure
        $.setContent( this.element, [ topbar, info ] );

        // set login visibility
        let infoSection = this.element.querySelector("#info-section");
        infoSection.setAttribute("style", "visibility: hidden");

        // set additional buttons visibility
        let btnsSection = this.element.querySelector("#data-btns");
        btnsSection.setAttribute("style", "visibility: hidden");

        // show/hide elements
        let changeVisibility = (elem) => {
          if (elem.style.visibility === "hidden") {
            elem.style.visibility = "visible";
          } else {
            elem.style.visibility = "hidden";
          }
        };

        // append submit form to the html structure
        this.element.querySelector("#info-form").appendChild(submitInstance.root);

        // start user instance and append it to html structure
        await this.user.start();
        this.element.querySelector("#user-login").appendChild(this.user.root);

        /**
         * get key of last saved exam
         */
        let getCurrentExamKey = async () => {
          let results = await this.store_editor.store.get();
          // let key = results[results.length - 1].key[0];
          let key = results[results.length - 1].key;
          $.onFinish(
            this,
            copyStringToClipboard(key),
            window.alert(`Here is your exam id: ${key}. Don't worry. It's already in your clipboard. Just paste it in the exam generator.`));
        };

        /**
         * copy a string to clipboard
         * Quelle: https://techoverflow.net/2018/03/30/copying-strings-to-the-clipboard-using-pure-javascript/
         */
        let copyStringToClipboard = (str) => {
           // Create new element
           var el = document.createElement('textarea');
           // Set value (string to be copied)
           el.value = str;
           // Set non-editable to avoid focus and move outside of view
           el.setAttribute('readonly', '');
           el.style = {position: 'absolute', left: '-9999px'};
           document.body.appendChild(el);
           // Select text inside element
           el.select();
           // Copy text to clipboard
           document.execCommand('copy');
           // Remove temporary element
           document.body.removeChild(el);
        };

      };

    }

  };

  // create custom element and start the component
  // Quelle: AKless-components; MKaul-components
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
