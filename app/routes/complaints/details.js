import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ComplaintsDetailsRoute extends Route {
  @service store;

  model(params) {
    return {
      complaintPromise: this.store.findRecord('complaint-form', params.id, { include: 'attachments' })
    }
  }
}
