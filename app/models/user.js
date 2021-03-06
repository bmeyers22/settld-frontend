import Ember from 'ember';
import DS from 'ember-data';
var User;

User = DS.Model.extend({
  homes: DS.hasMany('home', {
    async: true
  }),
  uid: DS.attr('string'),
  fuid: DS.attr('string'),
  vuid: DS.attr('string'),
  email: DS.attr('string'),
  age: DS.attr('number'),
  password: DS.attr('string'),
  passwordConfirmation: DS.attr('string'),
  currentPassword: DS.attr('string'),
  firstName: DS.attr('string'),
  lastName: DS.attr('string'),
  image: DS.attr('string'),
  name: Ember.computed('firstName', 'lastName', function() {
    return this.get('firstName' + ' ' + this.get('lastName'));
  }),
  providers: DS.attr('array'),
  hasPassword: DS.attr('boolean'),
  hasFacebook: DS.attr('boolean'),
  hasVenmo: DS.attr('boolean'),
  createdAt: DS.attr('number', {
    defaultValue() { return new Date().getTime(); }
  })
});

export default User;
