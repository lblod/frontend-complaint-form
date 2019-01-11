import Route from '@ember/routing/route';

export default Route.extend({
  async model() {
    const model = await this.store.createRecord('complaint-form');
    return model;
  }
});
