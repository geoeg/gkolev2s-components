/**
 * @overview datasets of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @editor Georgi Kolev <@> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

  /**********************************/

  // initial values for input elements of gkolev2s_quizform
  "gkolev2s_quizform_init": {
    "key": "gkolev2s_quizform_init",

    "questions": [
      /*** initial values for quiz form: ***/
      {
        "text": "test question 1",
        "description": "test description 1",
        "answers": [
          {
            "text": "test answer 1.1",
            "correct": true,
            "comment": "test comment 1.1",
          },
          {
            "text": "test answer 1.2",
            "correct": false,
            "comment": "test comment 1.2",
          },
          {
            "text": "test answer 1.3",
            "correct": true,
            "comment": "",
          },
          {
            "text": "test answer 1.4",
            "correct": false,
            "comment": "",
          },
          {
            "text": "test answer 1.5",
            "correct": false,
            "comment": "",
          }
        ]
      },
      {
        "text": "test question 2",
        "description": "test description 2",
        "answers": [
          {
            "text": "test answer 2.1",
            "correct": true,
            "comment": "test comment 2.1",
          },
          {
            "text": "test answer 2.2",
            "correct": false,
            "comment": "test comment 2.2",
          },
          {
            "text": "test answer 2.3",
            "correct": true,
            "comment": "",
          }
        ]
      },
      {
        "text": "test question 3",
        "description": "test description 3",
        "answers": [
          {
            "text": "test answer 3.1",
            "correct": true,
            "comment": "test comment 3.1",
          },
          {
            "text": "test answer 3.2",
            "correct": false,
            "comment": "test comment 3.2",
          }
        ]
      },
      {
        "text": "test question 4",
        "description": "test description 4",
        "answers": [
          {
            "text": "test answer 4.1",
            "correct": true,
            "comment": "test comment 4.1",
          },
          {
            "text": "test answer 4.2",
            "correct": false,
            "comment": "test comment 4.2",
          },
          {
            "text": "test answer 4.3",
            "correct": true,
            "comment": "",
          },
          {
            "text": "test answer 4.4",
            "correct": false,
            "comment": "",
          },
          {
            "text": "test answer 4.5",
            "correct": false,
            "comment": "",
          },
          {
            "text": "test answer 4.6",
            "correct": false,
            "comment": "",
          }
        ]
      },
      {
        "text": "test question 5",
        "description": "test description 5",
        "answers": [
          {
            "text": "test answer 5.1",
            "correct": true,
            "comment": "test comment 5.1",
          },
          {
            "text": "test answer 5.2",
            "correct": false,
            "comment": "test comment 5.2",
          },
          {
            "text": "test answer 5.3",
            "correct": true,
            "comment": "",
          },
          {
            "text": "test answer 5.4",
            "correct": false,
            "comment": "",
          }
        ]
      }

    ],


  },

  // special HTML structure for gkolev2s_quizform
  "gkolev2s_quizform": {
    "key": "gkolev2s_quizform",
    "data": [

            "<legend>Questions and Answers (Quiz)</legend>",

            {
              // "label": "questions",
              "name": "questions",
              "type": "several",
              // "info": "Fill up the form with quiz questions and answers.",
              "items": [
                {
                  "label": "question text",
                  "name": "text",
                  "type": "text",
                  "info": "Here add the question."
                },
                {
                  "label": "question description",
                  "name": "description",
                  "type": "text",
                  "info": "Here add description to the question."
                },
                {
                  "label": "question answers",
                  "name": "answers",
                  "type": "several",
                  "info": "Fill up the form with answers.",
                  "items": [
                    {
                      "label": "answer text",
                      "name": "text",
                      "type": "text",
                      "info": "Here add the answer."
                    },
                    {
                      "label": "answer correct",
                      "name": "correct",
                      "type": "checkbox",
                      "info": "Check the box if the answer is a correct one."
                    },
                    {
                      "label": "answer comment (optional)",
                      "name": "comment",
                      "type": "text",
                      "info": "Here add comment to the answer."
                    }
                  ]
                }
              ]
            },

            "<legend>Advanced Settings (Quiz)</legend>",

              {
                "label": "Start button",
                "name": "start_button",
                "type": "checkbox",
                "info": "helper.."
              },
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
              {
                "label": "Shuffle questions and answers",
                "name": "shuffle_quest_answ",
                "type": "checkbox",
                "info": "helper.."
              },
              {
                "type": "submit",
                "info": "helper.."
              }
              // {
              // Time Limit? Labels for Previous/Submit/Next/Finish buttons?
              // }


    ]
  },

  /**********************************/

  // initial values for input elements
  "gkolev2s_infoform_init": {
    "key": "gkolev2s_infoform_init",
    "date": "2020-01-30",
    "datetime-local": "2020-01-30T09:00",
    "subject": "Some Exam Title",
    "time": "09:00",
    "textarea": "120 Pts. = 120 Mins.",
  },

  // special HTML structure for gkolev2s_infoform
  "gkolev2s_infoform": {
    "key": "gkolev2s_infoform",

    "data": [

      "<legend>General exam info</legend>",

      {
        "label": "subject",
        "name": "subject",
        "type": "text",
        "info": "Add exam's subject"
      },
      {
        "label": "date",
        "name": "date",
        "type": "date",
        "info": "Add exam date"
      },
      {
        "label": "time",
        "name": "time",
        "type": "time",
        "info": "Add exam start time"
      },
      // alternative to 'date' and 'time':
      {
        "label": "datetime-local",
        "name": "datetime-local",
        "type": "datetime-local",
        "info": "Add exam's date and starting time"
      },
      {
        "label": "additional info",
        "name": "textarea",
        "type": "textarea",
        "info": "Add exam's addition information"
      },

    ]
  },

  /**********************************/

  /**********************************/

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
          },
        ]

      }
    ]
  },

  // special HTML structure for gkolev2s
  "gkolev2s": {
    "key": "gkolev2s",
    "data": [
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
          "info": "Text Text Text",
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
                //   "label": "Shuffle questions and answers",
                //   "name": "shuffle_quest_answ",
                //   "type": "checkbox",
                //   "info": "helper.."
                // },
                // {
                  // Time Limit? Labels for Previous/Submit/Next/Finish buttons?
                  // }

                ]
              },
              {
                "type": "submit"
              }
            ]
          }

  /**********************************/

};
