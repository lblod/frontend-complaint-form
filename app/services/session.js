import { service } from '@ember/service';
import BaseSessionService from 'ember-simple-auth/services/session';
import ENV from 'frontend-complaint-form/config/environment';
import { isValidAcmidmConfig } from 'frontend-complaint-form/utils/acmidm';

export default class SessionService extends BaseSessionService {
  @service router;

  get isAcmIdmSession() {
    if (!this.isAuthenticated) {
      return false;
    }

    return this.data.authenticated.authenticator === 'authenticator:acm-idm';
  }

  handleAuthentication() {
    const routeAfterAuthentication = 'complaints';
    super.handleAuthentication(routeAfterAuthentication);
  }

  requireAuthentication(transition) {
    const loginRoute = isValidAcmidmConfig(ENV.acmidm)
      ? 'acmidm-login'
      : 'mock-login';

    const isAuthenticated = super.requireAuthentication(transition, loginRoute);

    // The user isn't authenticated. We store the url in a cookie so we can retry it after logging in.
    if (!isAuthenticated) {
      // By default ESA only supports retrying transitions by looking at the `attemptedTransition` property.
      // However, this property isn't persisted, so after a page reload it is gone, which is an issue for our redirect-based ACM/IDM setup.
      // ESA also has a cookie-based redirect setup to support FastBoot. With a little bit of code we can hook into this system
      // so the redirect also survives a page reload.
      // TODO: remove this once it's built into the addon: https://github.com/mainmatter/ember-simple-auth/issues/2808
      const COOKIE_NAME = 'ember_simple_auth-redirectTarget'; // This is the name that ESA uses: https://github.com/mainmatter/ember-simple-auth/blob/1404c501c2ba9c8c6c071b05f38d42a057522318/packages/ember-simple-auth/src/-internals/routing.js#L37
      const redirectUrl = routeInfoUrl(transition.to, this.router);
      document.cookie = `${COOKIE_NAME}=${redirectUrl};path=/;samesite=strict`;
    }

    return isAuthenticated;
  }

  invalidate() {
    // We store the flag here since the data is cleared before the handleInvalidation method is called.
    this.wasAcmIdmSession = this.isAcmIdmSession;
    super.invalidate(...arguments);
  }

  handleInvalidation(logoutUrl) {
    if (this.wasAcmIdmSession) {
      logoutUrl = ENV.acmidm.logoutUrl;
    } else {
      logoutUrl = '/mock-login';
    }

    super.handleInvalidation(logoutUrl);
  }
}

// This converts a RouteInfo instance to the corresponding url by collecting all
// the route params and query params and using the router.urlFor method.
// This is a public API reimplementation of the `transition.intent.url` property.
// More info: https://discord.com/channels/480462759797063690/624403666585124895/897832626616926218
function routeInfoUrl(routeInfo, routerService) {
  let targetRoute = routeInfo.name;
  let allRouteParamValues = [];
  let allRouteQueryParams = {};

  routeInfo.find((routeInfo) => {
    routeInfo.paramNames.forEach((paramName) => {
      let paramValue = routeInfo.params[paramName];
      allRouteParamValues.push(paramValue);
      allRouteQueryParams = {
        ...allRouteQueryParams,
        ...routeInfo.queryParams,
      };
    });
  });

  return routerService.urlFor(targetRoute, ...allRouteParamValues, {
    queryParams: allRouteQueryParams,
  });
}
