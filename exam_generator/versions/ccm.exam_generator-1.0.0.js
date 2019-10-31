/**
 * @overview ccm component for generating exams
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @version 1.0.0
 * @license The MIT License (MIT)
 *
 */

( function () {

  const component = {

    name: 'exam_generator',

    version: [1, 0, 0],

    ccm: 'https://ccmjs.github.io/ccm/ccm.js',

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
            // generator title
            {
              tag: "h1",
              id: "builder-title",
              inner: "Exam-Generator"
            },
            // TODO: add user login?
            {
              tag: "hr"
            }

          ]

        },

        // EXAM GENERATOR FORM section:
        generator: {

          tag: "div",
          class: "generator",
          inner: [
            {
              // generator form section
              tag: "div",
              id: "generator-form",
              inner: []
            }
          ]
        }
      },

      /*** ccm-Components ***/

      // add submit component
      submit: [ "ccm.component", "https://ccmjs.github.io/akless-components/submit/versions/ccm.submit-7.1.3.js" ],

      // add logger instance
      logger: [ "ccm.instance", "https://ccmjs.github.io/akless-components/log/versions/ccm.log-4.0.1.js",
      [ "ccm.get", "https://ccmjs.github.io/akless-components/log/resources/configs.js", "greedy" ] ],

      /*** ccm-Datastores ***/
      // create db lvl-1 (lost after reload)
      // store: [ "ccm.store" ],

      // db lvl-2 (IndexedDB)
      store2: [ "ccm.store", { name: "data-level-2" } ],

      // create db lvl-2 (IndexedDB - using datasets.js)
      // store_js: {
      //   store: [ "ccm.store",  "resources/datasets.js" ],
      //   add key?
      // },

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

        // logging of "start" event
        this.logger.log( "start" );

        // section topbar logo, title
        const topbar = $.html( this.html.topbar, {});

        // Submit Config: 'Exam-Generator form'
        // TODO: update submit form
        const submitConfig = {
          "entries": [ "ccm.get", "resources/submit_resources/datasets.js", "gkolev2s_generator.data" ],
          "data": {
            "store": [ "ccm.store", "resources/submit_resources/datasets.js" ],
            "key": "gkolev2s_generator_init"
          },
          "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
          "onfinish": {
            "alert": "Exams generated successfully!",
            "log": true,
            callback: function () {
              generate()
            }
          }
        };

        // create, start and append submit instance for 'Generator Form' to html structure
        const submitInstance = await this.submit.instance(submitConfig);
        const submitResult = await submitInstance.start();

        // section exam info
        const generator = $.html( this.html.generator, {});

        // render the sections to the given in config html structure
        $.setContent( this.element, [ topbar, generator ] );
        // append 'generator-form' to the html structure
        this.element.querySelector("#generator-form").appendChild(submitInstance.root);

        // generate new exams and save those in matrix
        let generate = async () => {

          // get data form "Exam ID" field
          let examId = submitInstance.getValue().exam_id;
          // get amount for exams to create
          let amount = submitInstance.getValue().amount;
          // get shuffle option
          let shuffleOption = submitInstance.getValue().shuffle;

          // get data from store2 (lvl-2)
          let quizOrigin = await this.store2.get([examId]);
          // get the original questions
          let questOrigin = quizOrigin.quiz[0].questions;

          // Create a matrix out of array
          // Quelle: https://stackoverflow.com/questions/4492385/how-to-convert-simple-array-into-two-dimensional-array-matrix-with-javascript
          const toMatrix = (arr, width) =>
          arr.reduce((rows, key, index) => (index % width == 0 ?
            rows.push([key]) : rows[rows.length-1].push(key)) && rows, []);

          // create matrix with [0][i] original questions
          let questMatrix = toMatrix(questOrigin, questOrigin.length);

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

          await createVersion(questOrigin, questMatrix, amount);

          console.log("---> result after pushing the new array to the matrix:");
          console.log(questMatrix);
          console.log("-------------------------------------------------");
        };

        // TODO: Compare (quest-text/description?) function! Create a way to compare a copy to the original!
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

        };

      }

  };

  let b="ccm."+component.name+(component.version?"-"+component.version.join("."):"")+".js";if(window.ccm&&null===window.ccm.files[b])return window.ccm.files[b]=component;(b=window.ccm&&window.ccm.components[component.name])&&b.ccm&&(component.ccm=b.ccm);"string"===typeof component.ccm&&(component.ccm={url:component.ccm});let c=(component.ccm.url.match(/(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)/)||["latest"])[0];if(window.ccm&&window.ccm[c])window.ccm[c].component(component);else{var a=document.createElement("script");document.head.appendChild(a);component.ccm.integrity&&a.setAttribute("integrity",component.ccm.integrity);component.ccm.crossorigin&&a.setAttribute("crossorigin",component.ccm.crossorigin);a.onload=function(){window.ccm[c].component(component);document.head.removeChild(a)};a.src=component.ccm.url}
} )();
