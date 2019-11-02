/**
 * @overview ccm component for building exams
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 *
 * Done: Form for general exam information
 * Done: Flexible form for adding one or more quiz exercises
 * Done: At submitting the form save it on datastore lvl-2 with unique key
 * Done: Copying the generated exam key to the clipboard and inform the user for it
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
            // TODO: add user login?
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

        // exam info section:
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

      /*** ccm datastores ***/

      // create db lvl-1 (lost after reload)
      store: [ "ccm.store" ],

      // create db lvl-2 (IndexedDB)
      store2: [ "ccm.store", { name: "data-level-2" } ],

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
        this.logger.log( "start-exam-builder", logDateTime(date, time) );

        // section topbar logo, title
        const topbar = $.html( this.html.topbar, {
          // additional funtions to help working with data
          // will be deleted at the end
          get: async () => {
            console.log("---> data at lvl-1:");
            console.log(await this.store.get());
            // log current data saved at store2
            console.log("---> data at lvl-2:");
            console.log(await this.store2.get());
          },

          del: async () => {
            // delete all data on store2
            let storeCurrent = await this.store2.get();
            for (var i = 0; i < storeCurrent.length; i++) {
              this.store2.del(storeCurrent[i].key);
            };
            // log current values from store 2 after deleting all
            console.log("---> saved data deleted.");
            console.log(await this.store2.get());
          },

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
              settings: {
                name: "data-level-2"
              },
            },
            "alert": "Form data successfully saved!",
            callback: async () => {
             await getCurrentExamKey()
           },
           // render the exam_generator component when exam data is submitted
            // "render": {
            //   component: "../exam_generator/ccm.exam_generator.js",
            //   // TODO: do I need a config here? I load the standard version of the component that works without, but its just on loading.
            //   config: {} // config of exam generator component
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
        // append 'info-form' to the html structure
        this.element.querySelector("#info-form").appendChild(submitInstance.root);


        /**
         * get key of last saved exam
         */
        let getCurrentExamKey = async () => {
          let results = await this.store2.get();
          let key = results[results.length - 1].key[0];
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
