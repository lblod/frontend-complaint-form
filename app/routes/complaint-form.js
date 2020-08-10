import Route from '@ember/routing/route';

export default class ComplaintFormRoute extends Route {
  async model() {
    const model = await this.store.createRecord('complaint-form');
    return model;
  }
}
