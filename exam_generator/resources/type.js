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
        "key": null, // examId + "-" + excId
        "settings": {
          // "name": "gkolev2s_exam_results",
          "name": null,
          "url": "https://ccm2.inf.h-brs.de",
        },
      },
      "alert": "Answers to this quiz group have been saved!",
      },

  }

  // here can be added more types of exercises and their settings

}
