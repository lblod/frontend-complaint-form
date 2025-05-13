import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ComplaintsRoute extends Route {
  @service currentSession;
  @service session;

  beforeModel(transition) {
    if (this.session.requireAuthentication(transition)) {
      return this.currentSession.load();
    }
  }
}
