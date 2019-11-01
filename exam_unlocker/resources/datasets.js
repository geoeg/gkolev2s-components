/**
 * @overview datasets of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2017-2018
 * @editor Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'datasets.js' ] = {

  // initial values for gkolev2s
  "gkolev2s_unlocker_init": {
    "key": "gkolev2s_entrance_init",
    "password": "1234567890X1234567890",
    "matrikelnr": "1234567"

  },

  // special HTML structure for gkolev2s
  "gkolev2s_unlocker": {
    "key": "gkolev2s_unlocker",
    "data": [

      "<legend>Unlock Exam</legend>",

      {
        "label": "MatrikelNr.",
        "name": "matrikelnr",
        "type": "text",
        "info": "Add your MatrikelNr. in the field below."
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
