define(['backbone', 'jquery', 'underscore', 'firebase-app'], function (Backbone, $, _, app) {
  var SearchBar = Backbone.View.extend({
    events: {
      'keyup': 'keyup'
    },
    
    initialize: function (options) {
      'el' in options
        this.setElement(options.el);
      
      this.$results = $('#' + this.$el.data('results-id'));
    },
    
    keyup: function (e) {
      this.search(this.$el.val());
    },
    
    search: (function () {
      return _.throttle(function (searchQuery) {
        app.database().ref('how-to-tags/'+searchQuery).on('value', function (snap) {
          console.log(snap.val());
        });
      }, 333);
    })(),
    
  });
  
  $('.search-input').each(function () {
    new SearchBar({el: this});
  });
});