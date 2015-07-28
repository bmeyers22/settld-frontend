/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app'),
  env = EmberApp.env();

var isProductionLikeBuild = ['production', 'staging'].indexOf(env) > -1;

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    hinting: false,
    fingerprint: {
      enabled: isProductionLikeBuild,
      prepend: 'https://s3.amazonaws.com/app.settld.com/'
    },
    sassOptions: {
      sourceMap: false
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  app.import('vendor/javascripts/jquery-ui.js');
  app.import('bower_components/lodash/lodash.min.js');
  app.import('vendor/javascripts/socket.io.js');
  app.import('bower_components/moment/min/moment.min.js');
  app.import('vendor/javascripts/wptr/wptr.1.1.js');
  app.import('vendor/stylesheets/wptr/base.css');
  app.import('vendor/javascripts/semantic-mods.js');
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
