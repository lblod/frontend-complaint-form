import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ComplaintFormRoute extends Route {
  @service store;

  async model() {
    const model = await this.store.createRecord('complaint-form');
    return model;
  }
}
