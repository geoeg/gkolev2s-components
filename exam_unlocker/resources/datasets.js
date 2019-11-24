/**
 * @overview datasets of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @editor Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

  // initial values for gkolev2s
  "unlocker_init": {
    "key": "unlocker_init",
    "password": "1234567890X1234567890",
    "studentid": "1234567"

  },

  // special HTML structure for gkolev2s
  "unlocker": {
    "key": "unlocker",
    "data": [

      "<legend>Unlock Exam</legend>",

      {
        "label": "Student Id",
        "name": "studentid",
        "type": "number",
        "info": "Add your student id in the field below."
      },
      {
        "label": "Password",
        "name": "password",
        "type": "password",
        "info": "Add password in the field below."
      },
      {
        "type": "submit"
      }
    ]
  }

};
