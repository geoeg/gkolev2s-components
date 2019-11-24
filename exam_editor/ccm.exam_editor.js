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
    ccm: 'https://ccmjs.github.io/ccm/versions/ccm-24.0.5.js',
    // ccm: 'https://ccmjs.github.io/ccm/ccm.js',

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
                  tag: "div",
                  id: "current-parent-exams",
                },
                {
                  tag: "button",
                  class: "btn btn-primary btn-sm btn-block",
                  inner: "Get currently saved exam data from server",
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
                  inner: "Get student ids allowed to participate an exam",
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
                  inner: "(Test) Sort the saved results of exams",
                  title: "sort the submitted exam results (check console)",
                  onclick: "%sort%"
                },
                {
                  tag: "hr"
                }
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

      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],

      logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js",
        [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],

      user: [ 'ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js',
        [ 'ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','guest' ] ],
        // [ 'ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','hbrsinfkaul' ] ],

      // db_lvl2: [ "ccm.store", { name: "store-lvl-2" } ],

      css: ["ccm.load",
        "https://ccmjs.github.io/akless-components/libs/bootstrap/css/bootstrap.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/bootstrap/css/font-face.css" },
          "https://geoeg.github.io/gkolev2s-components/exam_editor/resources/default.css"
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
        this.logger && this.logger.log( 'start-exam-editor' );

        // functionality of admin panel buttons (helpers for working with data)
        const topbar = $.html( this.html.topbar, {

          get: async () => {


            let currentTable = this.element.querySelector("#current-parent-exams");
            if ( currentTable.hasChildNodes() ) {
              currentTable.removeChild(currentTable.firstChild);
            };

            let parentExams = await this.store_settings.editor.store.get();
            if ( parentExams.length == 0 ) {
              window.alert( "The storage is emtpy." );
            } else {
              let parentExamsTableData = [[["Position:"],["Key:"],["Value:"]]];
              for (var i = 0; i < parentExams.length; i++) {
                for (const [key, value] of Object.entries(parentExams[i])) {
                  if (key == "key" || key == "subject") {
                    parentExamsTableData.push([[i],[key],[value]]);
                  }
                };
              };
              await createTable(parentExamsTableData);
            }

            // get data from following data stores:
            let storedData = [ "editor" ,"generator" ,"unlocker" ,"results", "myself" ];
            for (var i = 0; i < storedData.length; i++) {
              console.log(await this.store_settings[storedData[i]].store.get());
            };

          },

          del: async () => {

            let parentExams = await this.store_settings.editor.store.get();
            if ( parentExams.length == 0 ) {
              window.alert( "The storage is already emtpy." );
            } else {
              let currentTable = this.element.querySelector("#current-parent-exams");
              if (currentTable.children.length !== 0) {
                currentTable.removeChild(currentTable.firstChild);
              }
              let editorData = await this.store_settings.editor.store.get();
              for (let i = 0; i < editorData.length; i++) {
                this.store_settings.editor.store.del(editorData[i].key)
              };

              window.alert("All data involved in the process of creating, generating and unlocking an exam was successfully deleted from h-brs server.");
            };

            // delete all stored data at following data stores:
            let storedData = [ "editor" ,"generator" ,"unlocker" ,"results", "myself" ];
            for (let i = 0; i < storedData.length; i++) {
              let data = await this.store_settings[storedData[i]].store.get();
              for (let j = 0; j < data.length; j++) {
                await this.store_settings[storedData[i]].store.del(data[j].key)
              };
            };

          },

          start: async () => {
            let userStatus = this.user.isLoggedIn();

            if (userStatus) {
              // if user is logged in -> only then allow "start" button to show submit form
              await changeVisibility(infoSection);
              let startBtn = this.element.querySelector("#start-btn");
              $.removeElement(startBtn);

              let admins = await this.store_settings.admins.store.get();
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
            // let adminUsers = await this.store_settings.admins.store.get("exam_editor_admins");
            // console.log("---> exam editor admin users:");
            // console.log(adminUsers.value);
            let res = await this.store_settings.students.store.get("allowed_ids");
            console.log("---> allowed students to unlock exam:");
            console.log(res.value);
            window.alert(`students allowed to participate: ${res.value}`);
          },

          reset: async () => {
            let studentIds = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9017419 ];
            await this.store_settings.students.store.set(
              {
                key: "allowed_ids",
                value: studentIds
              }
            );
          let res = await this.store_settings.students.store.get("allowed_ids");
          window.alert(`Reset of ids was successful. Students allowed to participate: ${res.value}`);
          },

          // ignore:
          sort: async () => {
            const res = await this.store_settings.results.store.get();
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
        const configKey = $.generateKey();

        // submit config for 'exam-editor's form
        const submitConfig = {

          "entries": this.submit_settings.entries,
          "data": this.submit_settings.data,
          "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
          "onfinish": {
            "log": true,
            "store": this.submit_settings.store,
            // "store.key": configKey,
            "alert": "Form data successfully saved!",
            callback: async () => {
             await getCurrentExamKey()
             // await copyStringToClipboard(configKey)
           },
           // render the exam_generator component when exam data is submitted
            // "render": {
            //   component: "https://geoeg.github.io/gkolev2s-components/exam_generator/ccm.exam_generator.js",
            //   // config: {} // config of exam generator component
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

          let savedData = await this.store_settings.editor.store.get();
          const FINAL_KEY = savedData[savedData.length - 1].key;

          $.onFinish(
            this,
            copyStringToClipboard(FINAL_KEY),
            window.alert(`Here is your exam id: ${FINAL_KEY}. Don't worry. It's already in your clipboard. Just paste it in the exam generator to generate as many as wished exam variations.`));
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

        // create table from 2d array
        // Quelle: https://stackoverflow.com/questions/15164655/generate-html-table-from-2d-javascript-array
        const createTable = (tableData) => {
          var table = document.createElement('table');
          var tableBody = document.createElement('tbody');

          tableData.forEach(function(rowData) {
            var row = document.createElement('tr');

            rowData.forEach(function(cellData) {
              var cell = document.createElement('td');
              cell.appendChild(document.createTextNode(cellData));
              row.appendChild(cell);
            });

            tableBody.appendChild(row);
          });

          table.appendChild(tableBody);
          // document.body.appendChild(table);
          this.element.querySelector("#current-parent-exams").appendChild(table);
        };

      };

    }

  };

  // create custom element and start the component
  // Quelle: AKless-components; MKaul-components
  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
