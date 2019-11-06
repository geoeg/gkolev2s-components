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
                "correct": false,
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
                "correct": false,
                "comment": "c-2.1",
              },
              {
                "text": "a-2.2",
                "correct": true,
                "comment": "c-2.2",
              },
              {
                "text": "a-2.3",
                "correct": false,
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
                "correct": false,
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
                "correct": false,
                "comment": "c-4.1",
              },
              {
                "text": "a-4.2",
                "correct": false,
                "comment": "c-4.2",
              },
              {
                "text": "a-4.3",
                "correct": false,
                "comment": "c-4.3",
              },
              {
                "text": "a-4.4",
                "correct": true,
                "comment": "",
              }
            ]
          }
        ],
        "start_button": true,
        "feedback": true,
        "navigation": true,
        "skippable": true,
        "finish_anytime": true,
        "shuffle_answers": true,
        "shuffle_questions": true,
        // "start_label": "Start",
        "previous_label": "Previous",
        "next_label": "Next",
        "submit_label": "Submit",
        "finish_label": "Finish",
        "clear_onfinish": true,
        "restart_onfinish": false
      },
      {
        "questions": [
          {
            "text": "2q-1",
            "description": "2d-1",
            "answers": [
              {
                "text": "2a-1.1",
                "correct": true,
                "comment": "2c-1.1",
              },
              {
                "text": "2a-1.2",
                "correct": false,
                "comment": "2c-1.2",
              },
              {
                "text": "2a-1.3",
                "correct": false,
                "comment": "2c-1.3",
              },
              {
                "text": "2a-1.4",
                "correct": false,
                "comment": "",
              }
            ]
          },
          {
            "text": "2q-2",
            "description": "2d-2",
            "answers": [
              {
                "text": "2a-2.1",
                "correct": false,
                "comment": "2c-2.1",
              },
              {
                "text": "2a-2.2",
                "correct": true,
                "comment": "2c-2.2",
              },
              {
                "text": "2a-2.3",
                "correct": false,
                "comment": "2c-2.3",
              },
              {
                "text": "2a-2.4",
                "correct": false,
                "comment": "",
              }
            ]
          }
        ],
        "start_button": false,
        "feedback": false,
        "navigation": false,
        "skippable": false,
        "finish_anytime": false,
        "shuffle_answers": false,
        "shuffle_questions": false,
        // "start_label": "Start",
        "previous_label": "Previous-2",
        "next_label": "Next-2",
        "submit_label": "Submit-2",
        "finish_label": "Finish-2",
        "clear_onfinish": false,
        "restart_onfinish": true
      }
    ],
  },

  // special HTML structure for gkolev2s
  "gkolev2s": {
    "key": "gkolev2s",
    "data": [
      // TODO: dete first submit button
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

          {
            "label": "Start button",
            "name": "start_button",
            "type": "checkbox",
            "info": "When enabled, a start button is displayed before the quiz starts."
          },
          {
            "label": "Feedback",
            "name": "feedback",
            "type": "checkbox",
            "info": "When enabled, automatic feedback will appear after answering a question."
          },
          {
            "label": "Navigation",
            "name": "navigation",
            "type": "checkbox",
            "info": "When enabled, you can navigate between the questions."
          },
          {
            "label": "Skippable",
            "name": "skippable",
            "type": "checkbox",
            "info": "When enabled, questions can be skipped."
          },
          {
            "label": "Finish anytime",
            "name": "finish_anytime",
            "type": "checkbox",
            "info": "When enabled, not all questions need to be answered in order to finish the quiz."
          },
          {
            "label": "Shuffle questions",
            "name": "shuffle_questions",
            "type": "checkbox",
            "info": "If selected, the questions (and only the questions) will be shuffled. (This option is visible after generating multiple exams with exam_generator.)"
          },
          {
            "label": "Random answers",
            "name": "shuffle_answers",
            "type": "checkbox",
            "info": "If selected, the answers of every question will be shuffled. (This option is visible after generating multiple exams with exam_generator.)"
          },
          // {
          //   "label": "Start button",
          //   "name": "start_label",
          //   "type": "text",
          //   "info": "Add label for 'start button'."
          // },
          {
            "label": "Previous button",
            "name": "previous_label",
            "type": "text",
            "info": "<i>Previous</i> is offered as a default button but can be renamed."
          },
          {
            "label": "Next button",
            "name": "next_label",
            "type": "text",
            "info": "<i>Next</i> is offered as a default button but can be renamed."
          },
          {
            "label": "Submit button",
            "name": "submit_label",
            "type": "text",
            "info": "<i>Submit</i> is offered as a default button but can be renamed."
          },
          {
            "label": "Finish button",
            "name": "finish_label",
            "type": "text",
            "info": "<i>Finish</i> is offered as a default button but can be renamed."
          },
          {
            "label": "Clear on finish",
            "name": "clear_onfinish",
            "type": "checkbox",
            "info": "If selected, after finishing the quiz the screen will be cleaned from all questions. (This option is helpful for exams, where the student are not allowed to get any feedback.)"
          },
          {
            "label": "Restart on finish",
            "name": "restart_onfinish",
            "type": "checkbox",
            "info": "If selected, after finishing the quiz it will be restarted and the user can have another attempt. (This option is helpful for preparation for real exams, where the students may have many attempts on the same set of exercises.)"
          },
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
    },


    /*** datasets for klausur_reader (Quelle: MKaul/klausur_reader/resources) ***/

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
