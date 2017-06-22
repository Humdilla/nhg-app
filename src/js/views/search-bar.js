define(['backbone', 'jquery', 'underscore', 'firebase-app'], function (Backbone, $, _, app) {
  
  var SearchResult = Backbone.View.extend({
    tagName: 'li',
    
    events: {
      
    },
    
    initialize: function (content) {
      this.$el.html(content);
    },
  });
  
  var StringEmitter = Backbone.Model.extend({
    string: '',
    initialize: function () {
      this.listenTo(this, 'change:string', function (model, value) {
        var oldS = model.previous('string');
        if (!oldS) {
          this.trigger('rewrite', model, value);
          return;
        }
        var newS = value;
        var oldL = oldS.length;
        var newL = newS.length;
        
        if (newL > oldL && newS.startsWith(oldS))
          this.trigger('append', model, value);
        else if (newL < oldL && oldS.startsWith(newS))
          this.trigger('slice', model, value);
      });
    }
  });
  
  var SearchBar = Backbone.View.extend({
    events: {
      'keyup': 'keyup'
    },
    
    initialize: function (options) {
      if('el' in options)
        this.setElement(options.el);
      
      this.$results = $('#' + this.$el.data('results-id'));
      this.results = [];
      this.searchCb = null;
      this.query = app.database().ref('how-to-tags').orderByKey();
      this.cachedResults = {};
      
      this.queryState = new StringEmitter();
      /* On rewrite, pull new search results from database */
      this.listenTo(this.queryState, 'rewrite', function (model, value) {
        this.results.forEach(function (result) {
          result.remove();
        });
        this.search(value);
      });
      this.listenTo(this.queryState, 'append', function (model, value) {
        // Filter cached results
      });
      
    },
    
    keyup: (function () {
      return _.throttle(function (e) {
        var val = this.$el.val();
        this.queryState.set('string', val);
      }, 333);
    })(),
    
    search: function (searchQuery) {
      if (this.searchCb)
        this.query.off('value', this.searchCb);
      if (!searchQuery)
        return;
      var self = this;
      this.searchCb = this.query.startAt(searchQuery).endAt(searchQuery + '\uf8ff')
      .on('value', function (snap) {
        var results = snap.val();
        for (var key in results) {
          self.cachedResults[key] = results[key];
          self.addResult(new SearchResult(key));
        }
      });
    },
    
    addResult: function (result) {
      this.results.push(result);
      this.$results.append(result.$el);
    },
    
  });
  
  $('.search-input').each(function () {
    new SearchBar({el: this});
  });
});