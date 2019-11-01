/**
 * @overview  datasets of ccm component for building exams
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @editor Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

  // initial values for gkolev2s
  "gkolev2s_init": {
    "key": "gkolev2s_infoform_init",

    "subject": "Some Exam Title",
    "date": "2020-01-30",
    "time": "09:00",
    "textarea": "120 Pts. = 120 Mins.",
    "quiz": [
      {
        "questions": [
          {
            "text": "q-1",
            "description": "d-1",
            "answers": [
              {
                "text": "a-1.1",
                "correct": true,
                "comment": "c-1.1",
              },
              {
                "text": "a-1.2",
                "correct": false,
                "comment": "c-1.2",
              },
              {
                "text": "a-1.3",
                "correct": true,
                "comment": "c-1.3",
              },
              {
                "text": "a-1.4",
                "correct": false,
                "comment": "",
              }
            ]
          },
          {
            "text": "q-2",
            "description": "d-2",
            "answers": [
              {
                "text": "a-2.1",
                "correct": true,
                "comment": "c-2.1",
              },
              {
                "text": "a-2.2",
                "correct": false,
                "comment": "c-2.2",
              },
              {
                "text": "a-2.3",
                "correct": true,
                "comment": "c-2.3",
              },
              {
                "text": "a-2.4",
                "correct": false,
                "comment": "",
              }
            ]
          },
          {
            "text": "q-3",
            "description": "d-3",
            "answers": [
              {
                "text": "a-3.1",
                "correct": true,
                "comment": "c-3.1",
              },
              {
                "text": "a-3.2",
                "correct": false,
                "comment": "c-3.2",
              },
              {
                "text": "a-3.3",
                "correct": true,
                "comment": "c-3.3",
              },
              {
                "text": "a-3.4",
                "correct": false,
                "comment": "",
              }
            ]
          },
          {
            "text": "q-4",
            "description": "d-4",
            "answers": [
              {
                "text": "a-4.1",
                "correct": true,
                "comment": "c-4.1",
              },
              {
                "text": "a-4.2",
                "correct": false,
                "comment": "c-4.2",
              },
              {
                "text": "a-4.3",
                "correct": true,
                "comment": "c-4.3",
              },
              {
                "text": "a-4.4",
                "correct": false,
                "comment": "",
              }
            ]
          }
        ],
        "feedback": true,
        "navigation": true,
        "skippable": true,
        "finish_anytime": true
      },
    ],
  },

  // special HTML structure for gkolev2s
  "gkolev2s": {
    "key": "gkolev2s",
    "data": [
      {
        "type": "submit"
      },
      "<legend>General Exam Information</legend>",

      {
        "label": "Subject",
        "name": "subject",
        "type": "text",
        "info": "Add exam's subject"
      },
      {
        "label": "Date",
        "name": "date",
        "type": "date",
        "info": "Add exam date"
      },
      {
        "label": "Time",
        "name": "time",
        "type": "time",
        "info": "Add exam start time"
      },
      {
        "label": "Additional info",
        "name": "textarea",
        "type": "textarea",
        "info": "Add exam's addition information"
      },
      // alternative to 'date' and 'time':
      // {
        //   "label": "Datetime-local",
        //   "name": "datetime-local",
        //   "type": "datetime-local",
        //   "info": "Add exam's date and starting time"
        // },
        {
          "label": "Quiz",
          "name": "quiz",
          "type": "several",
          "info": "This is a quiz exercise.",
          "items": [
            "<legend>Questions & Answers</legend>",
            {
              "label": "Questions",
              "name": "questions",
              "type": "several",
              "info": "Fill up the form with quiz questions and answers.",
              "items": [
                {
                  "label": "Question text",
                  "name": "text",
                  "type": "text",
                  "info": "Here add the question."
                },
                {
                  "label": "Question description",
                  "name": "description",
                  "type": "text",
                  "info": "Here add description to the question."
                },
                {
                  "label": "Question answers",
                  "name": "answers",
                  "type": "several",
                  "info": "Fill up the form with answers.",
                  "items": [
                    {
                      "label": "Answer text",
                      "name": "text",
                      "type": "text",
                      "info": "Here add the answer."
                    },
                    {
                      "label": "Answer correct",
                      "name": "correct",
                      "type": "checkbox",
                      "info": "Check the box if the answer is a correct one."
                    },
                    {
                      "label": "Answer comment (optional)",
                      "name": "comment",
                      "type": "text",
                      "info": "Here add comment to the answer."
                    }
                  ]
                }
              ]
            },
            "<legend>Advanced Settings</legend>",

              // {
              //   "label": "Start button",
              //   "name": "start_button",
              //   "type": "checkbox",
              //   "info": "helper.."
              // },
              {
                "label": "Feedback",
                "name": "feedback",
                "type": "checkbox",
                "info": "helper.."
              },
              {
                "label": "Navigation",
                "name": "navigation",
                "type": "checkbox",
                "info": "helper.."
              },
              {
                "label": "Skippable",
                "name": "skippable",
                "type": "checkbox",
                "info": "helper.."
              },
              {
                "label": "Finish anytime",
                "name": "finish_anytime",
                "type": "checkbox",
                "info": "helper.."
              },
              // {
              // Time Limit? Labels for Previous/Submit/Next/Finish buttons?
              // }
                ]
              },
              {
                "type": "submit"
              },
            ]
          },

  // demo quiz config (example by A.Kless)
  "demo": {
      "key": "demo",
      "css": [ "ccm.load", "https://ccmjs.github.io/akless-components/quiz/resources/weblysleek.css", { "context": "head", "url": "https://ccmjs.github.io/akless-components/libs/weblysleekui/font.css" } ], // !!!

      "questions": [
        {
          "text": "How many of these answers are correct?",
          "description": "Select the correct answer from the following answers.",
          "answers": [
            {
              "text": "one",
              "correct": true,
              "comment": "Because you can't choose more than one answer."
            },
            { "text": "two" },
            { "text": "three" }
          ],
          "input": "radio"
        },
        {
          "text": "How many answers can be correct here?",
          "description": "Pay attention to the input field type.",
          "answers": [
            {
              "text": "absolutely none",
              "correct": true
            },
            {
              "text": "maximum of one",
              "comment": "Because you can choose more than one answer."
            },
            {
              "text": "more than one",
              "correct": true
            }
          ]
        }
      ],

      "feedback": true, // !!!
      "navigation": true, // !!!
      "placeholder.finish": "Restart", // !!!
      "onfinish": { "log": true, "restart": true } // !!!
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

};
