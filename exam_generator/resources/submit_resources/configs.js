/**
 * @overview configurations of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @editor Georgi Kolev <georgi.kolev@smail.inf.h-brs.de> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "gkolev2s_generator": {
    "key": "gkolev2s_generator",
    "entries": [ "ccm.get", "../submit/resources/datasets.js", "gkolev2s_generator.data" ],
    "data": {
      "store": [ "ccm.store", "../submit/resources/datasets.js" ],
      "key": "gkolev2s_generator"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
    "onfinish": {
      // "store": true,
      "alert": "All forms saved!"
    }
  },

};
