/**
 * @overview  datasets of ccm component for building exams
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @editor Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

  // initial values for gkolev2s
  "form_init": {
    "key": "form_init",

    "subject": "Some Exam Title",
    "date": "2020-01-30",
    "time": "09:00",
    "examinfo": "120 Pts. = 120 Mins.",
    "exercises": [
      {
        "group_title": "Question Group Title 1",
        "questions": [
          {
            "text": "Question 1",
            "description": "Exercise 1.1",
            "answers": [
              {
                "text": "Answer 1.1",
                "correct": true,
                "comment": "Comment 1.1",
              },
              {
                "text": "Answer 1.2",
                "correct": false,
                "comment": "Comment 1.2",
              },
              {
                "text": "Answer 1.3",
                "correct": false,
                "comment": "Comment 1.3",
              },
              {
                "text": "Answer 1.4",
                "correct": false,
                "comment": "Comment 1.4",
              }
            ]
          },
          {
            "text": "Question 2",
            "description": "Exercise 1.2",
            "answers": [
              {
                "text": "Answer 2.1",
                "correct": false,
                "comment": "Comment 2.1",
              },
              {
                "text": "Answer 2.2",
                "correct": true,
                "comment": "Comment 2.2",
              },
              {
                "text": "Answer 2.3",
                "correct": false,
                "comment": "Comment 2.3",
              },
              {
                "text": "Answer 2.4",
                "correct": false,
                "comment": "Comment 2.4",
              }
            ]
          },
          {
            "text": "Question 3",
            "description": "Exercise 1.3",
            "answers": [
              {
                "text": "Answer 3.1",
                "correct": false,
                "comment": "Comment 3.1",
              },
              {
                "text": "Answer 3.2",
                "correct": false,
                "comment": "Comment 3.2",
              },
              {
                "text": "Answer 3.3",
                "correct": true,
                "comment": "Comment 3.3",
              },
              {
                "text": "Answer 3.4",
                "correct": false,
                "comment": "Comment 3.4",
              }
            ]
          },
          {
            "text": "Question 4",
            "description": "Exercise 1.4",
            "answers": [
              {
                "text": "Answer 4.1",
                "correct": false,
                "comment": "Comment 4.1",
              },
              {
                "text": "Answer 4.2",
                "correct": false,
                "comment": "Comment 4.2",
              },
              {
                "text": "Answer 4.3",
                "correct": false,
                "comment": "Comment 4.3",
              },
              {
                "text": "Answer 4.4",
                "correct": true,
                "comment": "Comment 4.4",
              }
            ]
          }
        ],
        "feedback": false,
        "navigation": true,
        "skippable": true,
        "start_button": false,
        "anytime_finish": true,
        "shuffle": true,
        "random": true,
        // "start_label": "Start",
        "placeholder.prev": "Previous",
        "placeholder.next": "Next",
        "placeholder.submit": "Submit",
        "placeholder.finish": "Finish",
        "onfinish.clear": true,
        "onfinish.restart": false
      },
      {
        "group_title": "Question Group Title 2",
        "questions": [
          {
            "text": "Question 1",
            "description": "Exercise 2.1",
            "answers": [
              {
                "text": "Answer 1.1",
                "correct": true,
                "comment": "Comment 1.1",
              },
              {
                "text": "Answer 1.2",
                "correct": false,
                "comment": "Comment 1.2",
              },
              {
                "text": "Answer 1.3",
                "correct": false,
                "comment": "Comment 1.3",
              },
              {
                "text": "Answer 1.4",
                "correct": false,
                "comment": "Comment 1.4",
              }
            ]
          },
          {
            "text": "Question 2",
            "description": "Exercise 2.2",
            "answers": [
              {
                "text": "Answer 2.1",
                "correct": false,
                "comment": "Comment 2.1",
              },
              {
                "text": "Answer 2.2",
                "correct": true,
                "comment": "Comment 2.2",
              },
              {
                "text": "Answer 2.3",
                "correct": false,
                "comment": "Comment 2.3",
              },
              {
                "text": "Answer 2.4",
                "correct": false,
                "comment": "Comment 2.4",
              }
            ]
          },
          {
            "text": "Question 3",
            "description": "Exercise 2.3",
            "answers": [
              {
                "text": "Answer 3.1",
                "correct": false,
                "comment": "Comment 3.1",
              },
              {
                "text": "Answer 3.2",
                "correct": false,
                "comment": "Comment 3.2",
              },
              {
                "text": "Answer 3.3",
                "correct": true,
                "comment": "Comment 3.3",
              },
              {
                "text": "Answer 3.4",
                "correct": false,
                "comment": "Comment 3.4",
              }
            ]
          }
        ],
        "feedback": false,
        "navigation": true,
        "skippable": true,
        "start_button": false,
        "anytime_finish": true,
        "shuffle": true,
        "random": true,
        // "start_label": "Start",
        "placeholder.prev": "Previous",
        "placeholder.next": "Next",
        "placeholder.submit": "Submit",
        "placeholder.finish": "Finish",
        "onfinish.clear": true,
        "onfinish.restart": false
      },
      {
        "group_title": "Question Group Title 3",
        "questions": [
          {
            "text": "Question 1",
            "description": "Exercise 3.1",
            "answers": [
              {
                "text": "Answer 1.1",
                "correct": true,
                "comment": "Comment 1.1",
              },
              {
                "text": "Answer 1.2",
                "correct": false,
                "comment": "Comment 1.2",
              },
              {
                "text": "Answer 1.3",
                "correct": false,
                "comment": "Comment 1.3",
              },
              {
                "text": "Answer 1.4",
                "correct": false,
                "comment": "Comment 1.4",
              }
            ]
          },
          {
            "text": "Question 2",
            "description": "Exercise 3.2",
            "answers": [
              {
                "text": "Answer 2.1",
                "correct": false,
                "comment": "Comment 2.1",
              },
              {
                "text": "Answer 2.2",
                "correct": true,
                "comment": "Comment 2.2",
              },
              {
                "text": "Answer 2.3",
                "correct": false,
                "comment": "Comment 2.3",
              },
              {
                "text": "Answer 2.4",
                "correct": false,
                "comment": "Comment 2.4",
              }
            ]
          }
        ],
        "feedback": false,
        "navigation": true,
        "skippable": true,
        "start_button": false,
        "anytime_finish": true,
        "shuffle": true,
        "random": true,
        // "start_label": "Start",
        "placeholder.prev": "Previous",
        "placeholder.next": "Next",
        "placeholder.submit": "Submit",
        "placeholder.finish": "Finish",
        "onfinish.clear": true,
        "onfinish.restart": false
      }

    ],
  },

  // special HTML structure for gkolev2s
  "form": {
    "key": "form",
    "data": [
      // TODO: delete first submit button
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
        "name": "examinfo",
        "type": "textarea",
        "info": "Add exam's addition information"
      },
      {
        "label": "Exercises",
        "name": "exercises",
        "type": "several",
        "info": "This is a quiz exercise. One quiz exercise can have one or more single or multiple choise questions.",
        "items": [
          {
            "label": "Type",
            "name": "type",
            "type": "select",
            "info": "Text Text Text",
            "items": [
              {
                "inner": "quiz",
                "value": "quiz"
              }
            ]
          },
          {
            "label": "Exercise group title",
            "name": "group_title",
            "type": "text",
            "info": "Here add the title for this group of questions."
          },
          // {
          //   "label": "Exercise type",
          //   "name": "type",
          //   "type": "hidden",
          //   "info": "Here add the exercise type."
          // },
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
            "name": "anytime_finish",
            "type": "checkbox",
            "info": "When enabled, not all questions need to be answered in order to finish the quiz."
          },
          {
            "label": "Shuffle questions",
            "name": "shuffle",
            "type": "checkbox",
            "info": "If selected, the questions (and only the questions) will be shuffled. (This option is visible after generating multiple exams with exam_generator.)"
          },
          {
            "label": "Random answers",
            "name": "random",
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
            "name": "placeholder.prev",
            "type": "text",
            "info": "<i>Previous</i> is offered as a default button but can be renamed."
          },
          {
            "label": "Next button",
            "name": "placeholder.next",
            "type": "text",
            "info": "<i>Next</i> is offered as a default button but can be renamed."
          },
          {
            "label": "Submit button",
            "name": "placeholder.submit",
            "type": "text",
            "info": "<i>Submit</i> is offered as a default button but can be renamed."
          },
          {
            "label": "Finish button",
            "name": "placeholder.finish",
            "type": "text",
            "info": "<i>Finish</i> is offered as a default button but can be renamed."
          },
          {
            "label": "Clear on finish",
            "name": "onfinish.clear",
            "type": "checkbox",
            "info": "If selected, after finishing the quiz the screen will be cleaned from all questions. (This option is helpful for exams, where the student are not allowed to get any feedback.)"
          },
          {
            "label": "Restart on finish",
            "name": "onfinish.restart",
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

};
