import DS from 'ember-data';

var UserSetting = DS.Model.extend({
  user: DS.belongsTo('user', {
    async: true
  }),
  hasPublicProfile: DS.attr('boolean', { defaultValue: true }),
  isUserConfigured: DS.attr('boolean', { defaultValue: false }),
  isGroupConfigured: DS.attr('boolean', { defaultValue: false }),
  defaultHome: DS.attr('string'),
  createdAt: DS.attr('number', {
    defaultValue() { return new Date().getTime(); }
  })
});

export default UserSetting
