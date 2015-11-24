import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return {
      invoices: Ember.Set.create(),
      actionMenuComponent: null,
      actionMenuModel: null
    }
  },
  actionBarMap: {
    transaction:  {
      component: 'transactions/actions-menu'
    }
  },
  actions: {
    paymentComplete(invoices) {
      this.get('currentModel.invoices').forEach((item) => {
        if (item.get('paid')) {
          this.send('removeInvoiceFromPayments', item);
        }
      });
      return this.store.pushPayload('invoice', {
        invoices: invoices
      });
    },
    addInvoiceToPayments(invoice) {
      $('.payments-bar').sidebar('show');
      this.get('currentModel.invoices').add(invoice);
    },
    removeInvoiceFromPayments(invoice) {
      this.get('currentModel.invoices').remove(invoice);
    },
    togglePaymentsBar() {
      $('.payments-bar').sidebar('toggle');
    },
    closeActionBar() {
      $('.global-action-bar').sidebar('hide');
      this.set('actionMenuComponent', '');
    },
    openActionBar(model) {
      this.set('currentModel.actionMenuModel', model);
      this.set('currentModel.actionMenuComponent', this.get('actionBarMap')[model.constructor.modelName].component);
      $('.global-action-bar').sidebar('show');
    }
  }
});
