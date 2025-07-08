import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class FileRedirectRoute extends Route {
  @service router;
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition);
  }

  async model(params) {
    // This call is only here to trigger a mu-allowed-groups update in the backend, so the complaint-form call doesn't fail after login in
    await this.store.findAll('account', {
      // This include is needed because otherwise the currentSession.load method returns the account without the user info, which throws an exception
      include: 'user',
    });

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
