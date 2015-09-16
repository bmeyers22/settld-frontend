import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ui', 'horizontal', 'top', 'fixed', 'inverted', 'icon', 'main', 'menu', 'user-top-bar'],
  configured: Ember.computed('session.userSettings.isUserConfigured', 'session.userSettings.isGroupConfigured', function () {
    return !!(this.get('session.userSettings.isUserConfigured') && this.get('session.userSettings.isGroupConfigured'));
  }),
  actions: {
    toggleUserBar() {
      this.sendAction('toggleUserBar');
    },
    toggleGroupsBar() {
      this.sendAction('toggleGroupsBar')
    },
    logout() {
      this.sendAction('logout');
    }
  }
});