ccm.files[ 'configs.js' ] = {

  "demo" : {

    // obligatory settings needed to run the form for creating an exam
    "submit_settings": {

      // structure of the exam form (general information and exercises)
      "entries": [ "ccm.get", "https://geoeg.github.io/gkolev2s-components/exam_editor/resources/datasets.js", "form.data" ],
      // "entries": [ "ccm.get", "./resources/datasets.js", "form.data" ],

      // initial data for the exam form
      "data": {
        "store": [ "ccm.store", "https://geoeg.github.io/gkolev2s-components/exam_editor/resources/datasets.js" ],
        // "store": [ "ccm.store", "./resources/datasets.js" ],
        "key": "form_init"
      },

      // storage for the created exam (when the form is submitted)
      "store": {
        "settings": {
          "name": "gkolev2s_exam_editor",
          "url": "https://ccm2.inf.h-brs.de"
        },
        // "key": "%configurationKey%"
      }

    },

    // user login settings (if no given, the default "guest" config will be loaded)
    "user": [ 'ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js', {
      "key": [ 'ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','hbrsinfkaul' ],
      "logged_in": true
    } ],
    // [ 'ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','compact' ] ],

    // those are additional settings for working with admin panel
    "store_settings": {

      // storage of original exams (parents)
      "editor": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_editor",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // users with admin rights
      "admins": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_admins",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // storage of the generated exams
      "generator": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_generator",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // storage for the students allowed to participate an exam
      "students": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_students",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // storage for the already unlocked exams
      "unlocker": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_unlocker",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // storage for the results of the exams
      "results": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_results",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // storage for my own results (testing with student id: 9017419)
      "myself": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_9017419",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

    }

  },

  "localform" : {

    // "onchange": console.log,
    // obligatory settings needed to run the form for creating an exam
    "submit_settings": {

      // structure of the exam form (general information and exercises)
      // TODO: change file path to github.io..
      "entries": [ "ccm.get", "./resources/datasets.js", "form.data" ],

      // initial data for the exam form
      "data": {
        // TODO: change file path to github.io..
        "store": [ "ccm.store", "./resources/datasets.js" ],
        "key": "form_init"
      },

      // storage for the created exam (when the form is submitted)
      "store": {
        "settings": {
          "name": "gkolev2s_exam_editor",
          "url": "https://ccm2.inf.h-brs.de"
        },
        // "key": "%configurationKey%"
      }

    },

    // user login settings (if no given, the default "guest" config will be loaded)
    "user": [ 'ccm.instance','https://ccmjs.github.io/akless-components/user/versions/ccm.user-9.3.0.js', {
      "key": [ 'ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','hbrsinfkaul' ],
      "logged_in": true
    } ],
    // [ 'ccm.get','https://ccmjs.github.io/akless-components/user/resources/configs.js','compact' ] ],

    // those are additional settings for working with admin panel
    "store_settings": {

      // storage of original exams (parents)
      "editor": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_editor",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // users with admin rights
      "admins": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_admins",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // storage of the generated exams
      "generator": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_generator",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // storage for the students allowed to participate an exam
      "students": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_students",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // storage for the already unlocked exams
      "unlocker": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_unlocker",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // storage for the results of the exams
      "results": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_results",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

      // storage for my own results (testing with student id: 9017419)
      "myself": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_9017419",
          "url": "https://ccm2.inf.h-brs.de"
        } ],
      },

    }

  }

}
