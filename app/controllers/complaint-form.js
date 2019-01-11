import Controller from '@ember/controller';
import { task } from 'ember-concurrency';

export default Controller.extend({
  saveComplaintError: null,

  saveComplaint: task(function*() {
    try {
      let complaint = this.get('model');
      complaint.set('created', new Date());
      yield complaint.save();
    } catch (e) {
      this.saveComplaintError = e.message;
    }
  }).drop(),

  actions: {
    submitComplaint() {
      const res = this.saveComplaint.perform();
      if(!this.saveComplaintError) {
        this.transitionToRoute('complaint-form');
      } else {
        // Display error message
      }
    }
  }
});
