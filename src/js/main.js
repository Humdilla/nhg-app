require.config({
  paths: {
    jquery: 'lib/jquery-3.1.1',
    backbone: 'lib/backbone',
    underscore: 'lib/underscore',
    firebase: 'lib/firebase'
  },
  shim: {
    firebase: {
      exports: 'firebase'
    }
  }
});

require(['views/search-bar'], function () {
  
});