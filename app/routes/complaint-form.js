import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    //felix
    const model = await this.store.createRecord('complaint-form');
    this.set('form', model);
    return model;
  },

  actions: {
    async submitComplaint() {
      //felix
      let complaint = this.form;
      var self = this;
      await complaint.save().then(function() {
        self.transitionTo('complaint-form');
      }).catch(function(reason) {
      });
    }
  }
});
