
import Ember from 'ember';
import DS from 'ember-data';
import Enums from 'web/enums';


var Transaction = DS.Model.extend({
  invoices: DS.hasMany('invoice', {async: true}),
  user: DS.belongsTo('user', {
    async: true
  }),
  home: DS.belongsTo('home', {
    async: true
  }),
  cost: DS.attr('number'),
  title: DS.attr('string'),
  description: DS.attr('string'),
  category: DS.attr('number'),
  categoryName: Ember.computed('category', function() {
    return Enums.TransactionCategories[this.get('category')];
  }),
  date: DS.attr('date', { defaultValue: new Date }),
  fuzzyDate: Ember.computed('date', function() {
    return moment(this.get('date')).fromNow();
  }),
  split: DS.attr('boolean'),
  points: DS.attr('number'),
  contributors: DS.attr('array'),
  createdAt: DS.attr('number', {
    defaultValue() { return new Date().getTime(); }
  })
});

export default Transaction
