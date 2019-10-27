/**
 * @overview
 * @author
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

    // this has to be the output config of exam builder
    // and at the same time the input config for a exam reader (for now just quiz)

    "inner_dataset": {
      "key": "inner_ds",
      "value": "some inner ds"
    }

    /*** datasets for klausur_reader (Quelle: MKaul/klausur_reader/resources) ***/
    // Info: check Ask and TODO from exam_builder

    // "se1_SoSe19": {
    //   "key": "se1_SoSe19",
    //   "url": "https://ccm2.inf.h-brs.de",
    //   "tasks": [
    //     {
    //       "title": 'Quiz Student - FB:F RD: T',
    //       "points": 2,
    //       "type": "quiz",
    //       "store": "quiz",
    //       "appid": "1544549104545X7414930366886783",
    //       "config": {
    //         // TODO: fix it. Student still get the feedback
    //         "feedback": false,
    //         "random": true
    //       }
    //     },
    //     {
    //       "title": 'Quiz Pruefer - FB:T RD: F',
    //       "points": 2,
    //       "type": "quiz",
    //       "store": "quiz",
    //       "appid": "1544549104545X7414930366886783",
    //       "config": {
    //         "feedback": true,
    //         "random": false
    //       }
    //     }
    //   ]
    // }

    /*** example from quiz/configs.js ***/

    // "demo": {
    //   "key": "demo",
    //   "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ],
    //   "questions": [
    //     {
    //       "text": "How many of these answers are correct?",
    //       "description": "Select the correct answer from the following answers.",
    //       "answers": [
    //         {
    //           "text": "one",
    //           "correct": true,
    //           "comment": "Because you can't choose more than one answer."
    //         },
    //         { "text": "two" },
    //         { "text": "three" }
    //       ],
    //       "input": "radio"
    //     },
    //     {
    //       "text": "How many answers can be correct here?",
    //       "description": "Pay attention to the input field type.",
    //       "answers": [
    //         {
    //           "text": "absolutely none",
    //           "correct": true
    //         },
    //         {
    //           "text": "maximum of one",
    //           "comment": "Because you can choose more than one answer."
    //         },
    //         {
    //           "text": "more than one",
    //           "correct": true
    //         }
    //       ]
    //     }
    //   ],
    //   "feedback": true,
    //   "navigation": true,
    //   "placeholder.finish": "Restart",
    //   "onfinish": { "log": true, "restart": true }
    // },


};
