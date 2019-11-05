/**
 * @overview ccm component for building exams
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 *
 * Done: Form for general exam information
 * Done: Flexible form for adding one or more quiz exercises
 * Done: At submitting the form save it on datastore lvl-3 with unique key
 * Done: Copying the generated exam key to the clipboard and inform the user for it
 * Done: Added login that is used for saving the unique exam id
 * Done: Make login manditory
 * Done: If logged in as "admin" only then show data buttons
 *
 */

(() => {

  "use strict";

  const component = {

    /**
     * unique component name
     */
    name: 'exam_builder',

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
              // builder title
              tag: "h1",
              id: "builder-title",
              inner: "Exam-Builder"
            },
            {
              tag: "hr"
            },
            {
              // user login
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
              // TODO: delete at the end
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
                  inner: "delete *.* !",
                  title: "delete all saved data (check console)",
                  onclick: "%del%"
                },
                {
                  tag: "hr"
                },
              ]
            }

          ]

        },

        // exam info section:
        info: {

          tag: "div",
          class: "info",
          id: "info-section",
          inner: [

            {
              // info form section
              tag: "div",
              id: "info-form",
              inner: []
            }
          ]
        }

      },

      /*** ccm components ***/

      // add submit component
      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],

      // add logger instance
      logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],

      // add user instance
      user: [ 'ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js',
        [ 'ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','compact' ] ],

      // Quelle: MKaul/klausur_reader
      hash: [ "ccm.load", { "url": "https://ccmjs.github.io/akless-components/modules/md5.mjs", "type": "module" } ],
      SALT: "123",

      /*** ccm datastores ***/

      // db lvl-1 (lost after reload)
      store: [ "ccm.store" ],

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

      // load bootstrap and default css file
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

        /*** Quelle: MKaul/klausur_reader ***/
        /** @type {string} */
        const username = this.user && this.user.isLoggedIn() ? this.user.data().user : this.user;

        // set a date that will be used for this instance
        /** @type {string} */
        const date = new Date().toLocaleString();

        // set signature for the instance -> = unique code
        /** @type {string} */
        const signature = this.hash && this.hash.md5( this.name + username + date.slice(0,10) + this.SALT );

        // logging of 'start' event
        // this.logger && this.logger.log( 'start-exam-builder', { name: this.name, user: username, date, signature } );
        this.logger && this.logger.log( 'start-exam-builder', { name: this.name, user: username, date } );
        /***********************************/

        // section topbar logo, title
        const topbar = $.html( this.html.topbar, {
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

          del: async () => {
            // delete all data at store 2
            let store2Current = await this.store2.get();
            for (var i = 0; i < store2Current.length; i++) {
              this.store2.del(store2Current[i].key);
            };
            // delete all data at store 3 - builder
            let store3BCurrent = await this.store_builder.store.get();
            for (var j = 0; j < store3BCurrent.length; j++) {
              this.store_builder.store.del(store3BCurrent[j].key)
            };
            // delete all data at store 3 - generator
            let store3GCurrent = await this.store_generator.store.get();
            for (var j = 0; j < store3GCurrent.length; j++) {
              this.store_generator.store.del(store3GCurrent[j].key)
            };
            // delete all data at store 3 - unlocker
            let store3UCurrent = await this.store_unlocker.store.get();
            for (var j = 0; j < store3UCurrent.length; j++) {
              this.store_unlocker.store.del(store3UCurrent[j].key)
            };
            // delete all data at store 3 - unlocker
            let store3RCurrent = await this.store_results.store.get();
            for (var j = 0; j < store3RCurrent.length; j++) {
              this.store_results.store.del(store3RCurrent[j].key)
            };
          },

          start: async () => {

            let userStatus = this.user.isLoggedIn();

            if (userStatus) {
              // if user is logged in -> only then allow "start" button to show submit form
              await changeFormVisibility();
              let startBtn = this.element.querySelector("#start-btn");
              $.removeElement(startBtn);

              let userName = this.user.data().user;
              // if user == "admin" -> only then show get/delete data buttons
              if (userName == "admin") {
                await changeBtnsVisibility();
              } else {
                let btns = this.element.querySelector("#data-btns");
                $.removeElement(btns);
              };
            } else {
              // inform user if not logged in
              window.alert("Please login first.");
            };

          }

        });

        // Submit Config: 'Exam-Builder as one form'
        const submitConfig = {
          "entries": [ "ccm.get", "resources/datasets.js", "gkolev2s.data" ],
          "data": {
            "store": [ "ccm.store", "resources/datasets.js" ],
            "key": "gkolev2s_init"
          },
          "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
          "onfinish": {
            "log": true,
            "store": {
              "settings": {
                "name": "gkolev2s_exam_builder",
                "url": "https://ccm2.inf.h-brs.de"
              },
              "key": signature
            },
            "alert": "Form data successfully saved!",
            callback: async () => {
             await getCurrentExamKey()
           },
           // render the exam_generator component when exam data is submitted
            // "render": {
              // component: "../exam_generator/ccm.exam_generator.js",
              // TODO: do I need a config here? I load the standard version of the component that works without, but its just on loading.
              // config: {} // config of exam generator component
            // }
          }
        };

        // create, start and append submit instance (info form) to html structure
        const submitInstance = await this.submit.instance(submitConfig);
        const submitResult = await submitInstance.start();

        // section exam info
        const info = $.html( this.html.info, {});

        // render the sections to the given in config html structure
        $.setContent( this.element, [ topbar, info ] );

        // make login manditory
        let infoSection = this.element.querySelector("#info-section");
        infoSection.setAttribute("style", "visibility: hidden");

        // show/hide submit form
        let changeFormVisibility = () => {
          if (infoSection.style.visibility === "hidden") {
            infoSection.style.visibility = "visible";
          } else {
            infoSection.style.visibility = "hidden";
          }
        };

        // hide additional buttons
        let btnsSection = this.element.querySelector("#data-btns");
        btnsSection.setAttribute("style", "visibility: hidden");

        // show/hide additional buttons
        let changeBtnsVisibility = () => {
          if (btnsSection.style.visibility === "hidden") {
            btnsSection.style.visibility = "visible";
          } else {
            btnsSection.style.visibility = "hidden";
          }
        };

        // append 'info-form' to the html structure
        this.element.querySelector("#info-form").appendChild(submitInstance.root);

        // start user instance and append it to html structure
        await this.user.start();
        this.element.querySelector("#user-login").appendChild(this.user.root);

        /**
         * get key of last saved exam
         */
        let getCurrentExamKey = async () => {
          // let results = await this.store2.get();
          let results = await this.store_builder.store.get();
          // let key = results[results.length - 1].key[0];
          let key = results[results.length - 1].key;
          // show key to the user as alert
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

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
