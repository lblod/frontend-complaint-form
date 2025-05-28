import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class FileRedirectRoute extends Route {
  @service router;
  @service store;

  async model(params) {
    const results = await this.store.query('complaint-form', {
      'filter[attachments][:id:]': params.id,
    });

    const linkedComplaintForm = results.at(0);

    if (linkedComplaintForm) {
      this.router.transitionTo('complaints.details', linkedComplaintForm.id);
    } else {
      throw new Error(
        "Couldn't find the complaint form to which this file is attached.",
      );
    }
  }
}
