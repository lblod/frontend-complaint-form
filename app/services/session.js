import BaseSessionService from 'ember-simple-auth/services/session';

export default class SessionService extends BaseSessionService {
  handleAuthentication() {
    const routeAfterAuthentication = 'complaints';
    super.handleAuthentication(routeAfterAuthentication);
  }

  requireAuthentication(transition) {
    // TODO: update this logic when we add ACM/IDM logins
    // https://github.com/lblod/frontend-dashboard/blob/8563a7dd573d9341b303a19e954f5cc4e917893e/app/services/session.js#L17
    const loginRoute = 'mock-login';

    return super.requireAuthentication(transition, loginRoute);
  }
}
