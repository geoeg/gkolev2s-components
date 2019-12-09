/**
 * @overview configurations of ccm components that are used for generating unique exam varations
 * @author Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'type.js' ] = {

  "quiz": {

    "key": "quiz",

    "config": {
        "key": null,
        "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css",
        { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ]
    },

    "onfinish": {
      "store": {
        "key": null,
        "settings": {
          "name": null,
          "url": "https://ccm2.inf.h-brs.de",
        },
      },
      "alert": "Answers to this quiz group have been saved!",
      },

  }

  // here can be added more types of exercises and their settings

}
