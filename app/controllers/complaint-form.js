import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { computed } from '@ember/object';

export default Controller.extend({
  showErrors: computed('_showErrors', {
    get() {
      return this._showErrors || {
        name: false,
        street: false,
        houseNumber: false,
        postalCode: false,
        locality: false,
        telephone: false,
        email: false,
        content: false
      };
    },

    set(key, value) {
      this.set('_showErrors', value);
      return this._showErrors;
    }
  }),

  saveComplaint: task(function*() {
    try {
      throw new Error("Message");
      let complaint = this.get('model');
      complaint.set('created', new Date());
      yield complaint.save();
    } catch (e) {
      this.set('saveComplaintError', e.message);
    }
  }).drop(),

  actions: {
    submitComplaint() {
      this.set('saveComplaintError', null);
      this.saveComplaint.perform();
      if (!this.saveComplaintError) {
        this.transitionToRoute('confirmation');
      }
    },

    attachFile(file) {
      this.model.attachments.pushObject(file);
    },

    deleteFile(file) {
      this.model.attachments.removeObject(file);
    }
  }
});
