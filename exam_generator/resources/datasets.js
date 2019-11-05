/**
 * @overview datasets of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @editor Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

  // initial values for gkolev2s_generator
  "gkolev2s_generator_init": {
    "key": "gkolev2s_generator_init",

    "exam_id": "1572444407469X3812613927313322",
    "amount": 5,
    // "shuffle": true

  },

  // special HTML structure for gkolev2s_generator
  "gkolev2s_generator": {
    "key": "gkolev2s_generator",

    "data": [

      "<legend>Add Exam</legend>",

      {
        "label": "Exam ID",
        "name": "exam_id",
        "type": "text",
        "info": "Add exam's id."
      },
      {
        "label": "Amount",
        "name": "amount",
        "type": "number",
        "info": "Add amount of exams to be generated.",
        "min": 1
      },
      // {
      //   "label": "Shuffle Q&A",
      //   "name": "shuffle",
      //   "type": "checkbox",
      //   "info": "Check if you want to shuffle all Q&A"
      // },
      {
        "type": "submit"
      }

    ]
  }

};
