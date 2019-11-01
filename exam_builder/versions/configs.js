/**
 * @overview configurations of ccm component for submitting data
 * @author André Kless <andre.kless@web.de> 2018
 * @editor Georgi Kolev <@> 2019
 * @license The MIT License (MIT)
 */

ccm.files[ 'configs.js' ] = {

  "gkolev2s": {
    "key": "gkolev2s",
    "entries": [ "ccm.get", "../submit/resources/datasets.js", "gkolev2s.data" ],
    "data": {
      "store": [ "ccm.store", "../submit/resources/datasets.js" ],
      "key": "gkolev2s_init"
    },
    "content": [ "ccm.component", "https://ccmjs.github.io/akless-components/content/versions/ccm.content-5.0.1.js" ],
    "onfinish": {
      // "store": true,
      "alert": "All forms saved!"
    }
  }

};
