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
            }

          ]

        },

        // EXAM-INFO section:
        info: {

          tag: "div",
          class: "info",
          inner: [
            {
              tag: "hr"
            },
            {
              tag: "div",
              id: "info-form",
              inner: []
            }

          ]
        },


        // QUIZ FORM Btns section:
        btns: {

          tag: "div",
          id: "quiz-form-btns",
          inner: [
            {
              tag: "button",
              class: "btn btn-primary",
              inner: "add quiz form",
              title: "add new quiz form",
              onclick: "%add%"
            },
            {
              tag: "button",
              class: "btn btn-primary",
              inner: "remove quiz form",
              title: "remove quiz form",
              onclick: "%remove%"
            },
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
              inner: "set quiz form",
              title: "set added quiz form on lvl-2",
              onclick: "%set%"
            },
            {
              tag: "button",
              class: "btn btn-primary",
              inner: "delete!",
              title: "delete all saved data on lvl-2 (check console)",
              onclick: "%del%"
            }
          ]
        },

        forms: {

          tag: "div",
          id: "quiz-forms",
          inner: []
        }

      },

      /*** ccm-Components ***/

      // submit_component: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js",
      //   [ "ccm.get", "../../akless-components/akless-components/submit/resources/configs.js", "gkolev2s_demo" ]
      //   ],

      // submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js", {
      //   // [ "ccm.get", "../../akless-components/akless-components/submit/resources/configs.js", "gkolev2s_demo" ]
      //     "entries": [ "ccm.get", "../../akless-components/akless-components/submit/resources/datasets.js", "gkolev2s_quizform.data" ],
      //     "data": {
      //       "store": [ "ccm.store", "../../akless-components/akless-components/submit/resources/datasets.js" ],
      //       "key": "gkolev2s_quizform"
      //     },
      //     "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
      //     // "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.2.0.js", {
      //     //   "html.inner.1": "",
      //     //   "directly": true
      //     // } ],
      //     "onfinish": {
      //       "store": true,
      //       "alert": "Quiz saved!"
      //     }
      //   }
      // ],

      // start submit exam info form instance
      submit_info: [ "ccm.start", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js", {
        // Ask: the best way to save config like this here? Now using local paths..
        "entries": [ "ccm.get", "../../gkolev2s/akless-components/akless-components/submit/resources/datasets.js", "gkolev2s_infoform.data" ],
        "data": {
          "store": [ "ccm.store", "../../gkolev2s/akless-components/akless-components/submit/resources/datasets.js" ],
          "key": "gkolev2s_infoform_init"
        },
        "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
        // not using the json_builder.. may remove it from config
        // "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.2.0.js", {
        //   "html.inner.1": "",
        //   "directly": true
        // } ],
        "onfinish": {
          "store": true,
          "alert": "Exam info saved!"
        }
      }
      ],

      // start submit quiz form instance
      submit_quiz: [ "ccm.start", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js", {
        // Ask: the best way to save config like this here? Now using local paths..
        "entries": [ "ccm.get", "../../gkolev2s/akless-components/akless-components/submit/resources/datasets.js", "gkolev2s_quizform.data" ],
        "data": {
          "store": [ "ccm.store", "../../gkolev2s/akless-components/akless-components/submit/resources/datasets.js" ],
          "key": "gkolev2s_quizform_init"
        },
        "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
        // not using the json_builder.. may remove it from config
        // "json_builder": [ "ccm.component", "https://ccmjs.github.io/akless-components/json_builder/versions/ccm.json_builder-1.2.0.js", {
        //   "html.inner.1": "",
        //   "directly": true
        // } ],
        "onfinish": {
          "store": true,
          "alert": "Quiz saved!"
        }
      }
      ],

      // Ask: Do I really need the logger?
      logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],

      onfinish: {
        alert: "Form data saved successfully on datastore lvl-2!"
      },

      /*** ccm-Datastores ***/

      // create db lvl-1 (lost after reload)
      store: [ "ccm.store" ],

      // create db lvl-2 (IndexedDB)
      // Ask: Where here can I add a key? !DONT CHANGE NAME!
      store2: [ "ccm.store", { name: "data-level-2" } ],

      // create db lvl-2 (using datasets.js)
      // Ask: How to use store_js with key and local file
      store_js: {
        store: [ "ccm.store",  "resources/datasets.js" ],
        // key: "test_js"
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

      };

      this.start = async () => {

        // get initial form values
        // let data = await $.dataset( this.store2 );

        // logging of "start" event
        // this.logger && this.logger.log( "start", $.clone( data ) );
        // Ask: Why not using directly logger.log()?
        // this.logger.log( "start" );

        // log helpers
        console.log("---> ccm.helper.functions:");
        console.log($);
        console.log("---> components instance:");
        console.log(this);
        console.log("---> submit_quiz instance:");
        console.log(this.submit_quiz);

        // section topbar logo, title, login?
        const topbar = $.html( this.html.topbar, {

        });

        // section general exam info
        const info = $.html( this.html.info, {

        });

        // section with buttons to add/del quiz form
        const btns = $.html( this.html.btns, {

          add: async () => {
            // add quiz form
            // create new <div> for the form
            const newForm = document.createElement("div");
            // set id to the new <div>
            newForm.id = "test-id";
            // append the new <div> to the html structure
            this.element.querySelector("#quiz-forms").appendChild(newForm);
            // append the quiz form (submit_quiz) to the created <div>
            this.element.querySelector("#test-id").appendChild(this.submit_quiz.root);

            // log starting values of submit_quiz form
            console.log("---> start values (if any):");
            console.log(this.submit_quiz.getValue());
          },

          get: async () => {
            // log current data saved at lvl-1
            console.log("---> data at lvl-1:");
            console.log(await this.store.get());
            // log current data saved at lvl-2
            console.log("---> data at lvl-2:");
            console.log(await this.store2.get());
            // log current values of submit_quiz form
            console.log("---> current form values:");
            console.log(this.submit_quiz.getValue());
          },

          set: async () => {
            let results = this.submit_quiz.getValue();
            // save current values at datastore lvl-1
            await this.store.set(
              { key: "quiz-settings", value: results}
            );
            // save current values at datastore lvl-2
            await this.store2.set(
              { key: "quiz-settings", value: results}
            );

            // log current data saved at lvl-1
            console.log("---> data stored at lvl-1:");
            console.log(await this.store.get());
            // log current data saved at lvl-2
            console.log("---> data stored at lvl-2:");
            console.log(await this.store2.get());
            // log current values of submit_quiz form
            console.log("---> current form values:");
            console.log(this.submit_quiz.getValue());

            $.onFinish(
              this // runs the "onfinish" section from components config
              // console.log("some other functions"); // other func may be added here (add ,)
            );
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

          remove: async () => {
            // remove quiz form
            parent = this.element.querySelector("#quiz-forms");
            if (parent.hasChildNodes()) {
              parent.removeChild(parent.lastChild);
            };

            // log current values of submit_quiz form after removing the it
            console.log("---> form removed.");
          }
        });

        // section with quiz form
        const forms = $.html( this.html.forms, {

        });

        // render the sections to the given in config html structure
        $.setContent( this.element, [ topbar, info, btns, forms ] );

      };

    }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
