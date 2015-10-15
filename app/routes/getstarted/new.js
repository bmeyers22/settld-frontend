import Ember from 'ember';


var GetstartedNewRoute = Ember.Route.extend({
  actions: {
    cancelCreate(home) {
      this.transitionTo('getstarted');
    },
    saveHome(home) {
      let settings = this.get('currentSession.userSettings'),
        self = this;
      settings.set('isGroupConfigured', true);
      settings.set('defaultHome', home.get('id'));
      settings.save().then( function (settings) {
        self.transitionTo('app');
      });
      this.session.set('currentHome', home);
      this.session.set('CURRENT_HOME_ID', home.get('id'));

    }
  }
});

export default GetstartedNewRoute
