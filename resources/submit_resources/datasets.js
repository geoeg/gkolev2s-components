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
          },
          {
            "text": "test answer 2.4",
            "correct": false,
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
          },
          {
            "text": "test answer 3.3",
            "correct": true,
            "comment": "",
          },
          {
            "text": "test answer 3.4",
            "correct": false,
            "comment": "",
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
  /* Original code of A.Kless */
  // initial values for input elements of local demo
  "test": {
    "key": "test",
    "color": "#66CCFF",
    "date": "2017-11-21",
    "datetime-local": "2017-11-21T16:53",
    "email": "john.doeeeee@web.de",
    "hidden": "secret",
    "month": "2017-11",
    "password": "secret",
    "search": "found!",
    "tel": "0123456789",
    "text": "John Doe",
    "time": "16:54",
    "url": "https://www.john-doe.com",
    "week": "2017-W47",
    "number": 4711,
    "range": 5,
    "checkbox": true,
    "multi-checkbox": [ 'A', 'C' ],
    "radio": "B",
    "select": "B",
    "multi-select": [ 'A', 'C' ],
    "textarea": "My Story",
    "contenteditable": "This is editable text.",
    "complex-data": { "A": [ "B", "C" ] },
    "deep": { "property": "A" },
    "texts": [ "foo", "bar" ],
    "highscore": [ { "player": "john", "score": 100 }, { "player": "jane", "score": 100 } ],
    "object": { "foo": "bar", "abc": "xyz" },
    "json_builder": { "foo": "bar" },
    "objects": [ { "foo": "bar" }, { "abc": "xyz" } ]
  },

  // special HTML structure for demo
  "demo": {
    "key": "demo",
    "data": [
      "<source src='https://ccmjs.github.io/akless-components/blank/ccm.blank.js'>",
      "<legend>Decoration</legend>",
      "<ccm-blank></ccm-blank>",
      "<legend>Input</legend>",
      {
        "label": "color",
        "name": "color",
        "type": "color",
        "info": "Text text text"
      },
      {
        "label": "date",
        "name": "date",
        "type": "date",
        "info": "Text Text Text"
      },
      {
        "label": "datetime-local",
        "name": "datetime-local",
        "type": "datetime-local",
        "info": "Text Text Text"
      },
      {
        "label": "email",
        "name": "email",
        "type": "email",
        "info": "Text Text Text"
      },
      {
        "name": "hidden",
        "type": "hidden"
      },
      {
        "label": "month",
        "name": "month",
        "type": "month",
        "info": "Text Text Text"
      },
      {
        "label": "password",
        "name": "password",
        "type": "password",
        "info": "Text Text Text"
      },
      {
        "label": "search",
        "name": "search",
        "type": "search",
        "info": "Text Text Text"
      },
      {
        "label": "tel",
        "name": "tel",
        "type": "tel",
        "info": "Text Text Text"
      },
      {
        "label": "text",
        "name": "text",
        "type": "text",
        "info": "Text Text Text"
      },
      {
        "label": "time",
        "name": "time",
        "type": "time",
        "info": "Text Text Text"
      },
      {
        "label": "url",
        "name": "url",
        "type": "url",
        "info": "Text Text Text"
      },
      {
        "label": "week",
        "name": "week",
        "type": "week",
        "info": "Text Text Text"
      },
      "<legend>Number</legend>",
      {
        "label": "number",
        "name": "number",
        "type": "number",
        "info": "Text Text Text",
        "min": 1
      },
      {
        "label": "range",
        "name": "range",
        "type": "range",
        "min": 1,
        "max": 10,
        "info": "Text Text Text"
      },
      "<legend>Checkbox</legend>",
      {
        "label": "checkbox",
        "name": "checkbox",
        "type": "checkbox",
        "info": "Text Text Text"
      },
      {
        "label": "multi-checkbox",
        "name": "multi-checkbox",
        "type": "multi-checkbox",
        "info": "Text Text Text",
        "items": [
          {
            "label": "checkbox A",
            "value": "A"
          },
          {
            "label": "checkbox B",
            "value": "B"
          },
          {
            "label": "checkbox C",
            "value": "C"
          }
        ]
      },
      "<legend>Radio</legend>",
      {
        "label": "radio",
        "name": "radio",
        "type": "radio",
        "info": "Text Text Text",
        "items": [
          {
            "label": "radio A",
            "value": "A"
          },
          {
            "label": "radio B",
            "value": "B"
          },
          {
            "label": "radio C",
            "value": "C"
          }
        ]
      },
      "<legend>Select</legend>",
      {
        "label": "select",
        "name": "select",
        "type": "select",
        "info": "Text Text Text",
        "items": [
          {
            "inner": "option A",
            "value": "A"
          },
          {
            "inner": "option B",
            "value": "B"
          },
          {
            "inner": "option C",
            "value": "C"
          }
        ]
      },
      {
        "label": "multi-select",
        "name": "multi-select",
        "type": "multi-select",
        "info": "Text Text Text",
        "items": [
          {
            "label": "option A",
            "value": "A"
          },
          {
            "label": "option B",
            "value": "B"
          },
          {
            "label": "option C",
            "value": "C"
          }
        ]
      },
      "<legend>Textarea</legend>",
      {
        "label": "textarea",
        "name": "textarea",
        "type": "textarea",
        "info": "Text Text Text"
      },
      "<legend>Special</legend>",
      {
        "name": "generated_key",
        "type": "key"
      },
      {
        "label": "contenteditable",
        "name": "contenteditable",
        "type": "contenteditable",
        "info": "Text Text Text"
      },
      {
        "label": "deep.property",
        "name": "deep.property",
        "type": "text",
        "info": "Text Text Text"
      },
      {
        "label": "texts",
        "type": "several",
        "info": "Text Text Text",
        "item": {
          "label": "text %nr%",
          "name": "texts",
          "type": "text"
        }
      },
      {
        "label": "highscore",
        "name": "highscore",
        "type": "several",
        "info": "Text Text Text",
        "items": [
          {
            "label": "player",
            "name": "player",
            "type": "text",
            "info": "Text Text Text"
          },
          {
            "label": "score",
            "name": "score",
            "type": "number",
            "info": "Text Text Text",
            "min": 0
          }
        ]
      },
      {
        "label": "object",
        "name": "object",
        "type": "object",
        "info": "Text Text Text"
      },
      "<legend><i>ccm</i>-based Input Elements</legend>",
      {
        "label": "json_builder",
        "name": "json_builder",
        "type": "json_builder",
        "info": "Text Text Text",
        "key": "[\"ccm.get\",\"https://ccmjs.github.io/akless-components/json_builder/resources/configs.js\",\"demo\"]"
      },
      {
        "label": "objects",
        "type": "several",
        "info": "Text Text Text",
        "item": {
          "label": "object %nr%",
          "name": "objects",
          "type": "json_builder"
        }
      },
      { "type": "submit" }
    ]
  }

};
