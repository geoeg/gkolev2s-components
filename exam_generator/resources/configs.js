/**
 * @overview configurations of ccm component for generating unique exam varations
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "demo" : {

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

    }

  }

}
