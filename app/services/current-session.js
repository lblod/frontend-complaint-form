import Service, { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CurrentSessionService extends Service {
  @service session;
  @service store;

  @tracked account;

  get isLoaded() {
    return Boolean(this.account);
  }

  get user() {
    return this.account.user;
  }

  get _roles() {
    return this.isLoaded
      ? this.session.data.authenticated.data.attributes.roles
      : [];
  }

  async load() {
    if (this.session.isAuthenticated && !this.isLoaded) {
      const accountId =
        this.session.data.authenticated.relationships.account.data.id;

      this.account = await this.store.findRecord('account', accountId, {
        include: 'user',
      });
    }
  }
}
