import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const model = await this.store.createRecord('complaint-form');
    return model;
  },

  actions: {
    async submitComplaint() {
      let complaint = this.modelFor(this.routeName);
      var self = this;
      await complaint.save().then(function() {
        self.transitionTo('complaint-form');
      }).catch(function(reason) {
      });
    }
  }
});
