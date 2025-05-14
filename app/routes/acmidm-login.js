import Route from '@ember/routing/route';
import { service } from '@ember/service';
import buildUrlFromConfig from '@lblod/ember-acmidm-login/utils/build-url-from-config';
import ENV from 'frontend-complaint-form/config/environment';
import { isValidAcmidmConfig } from 'frontend-complaint-form/utils/acmidm';

export default class AcmidmLoginRoute extends Route {
  @service session;

  beforeModel() {
    if (this.session.prohibitAuthentication('complaints')) {
      if (isValidAcmidmConfig(ENV.acmidm)) {
        window.location.assign(buildUrlFromConfig(ENV.acmidm));
      } else {
        throw new Error('Missing ACM/IDM config');
      }
    }
  }
}
