import Ember from 'ember';

var HomesNewController = Ember.Controller.extend({
  needs: 'application',
  saveHome: function(obj) {
    let self = this,
      home = this.store.createRecord('home', obj),
      authUser = this.session.get('authUser'),
      prom = new Promise(function(resolve, reject) {
        home.get('users').pushObject(authUser);
        home.save().then(function(home) {
          authUser.get('homes').pushObject(home);
          authUser.save();
          resolve(home);
        }, function(error) {
          reject(error);
        });
      });
    prom.then(function(home) {
      self.get('target').send('saveHome', home);
    });
    return prom;
  },
  actions: {
    createHome: function(home) {
      this.saveHome(home);
    }
  }
});

export default HomesNewController
