/**
 * @overview configurations of ccm component for unlocking exam variation and participating an exam
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "demo" : {

    "ex_types": {

      "quiz":  [ "ccm.component", "https://ccmjs.github.io/akless-components/quiz/versions/ccm.quiz-4.0.0.js" ]

    },

    "store_settings": {

      // storage of original exams (parents)
      "editor": {
        "store": [ "ccm.store", {
          "name": "gkolev2s_exam_editor",
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

    }

  }

}
