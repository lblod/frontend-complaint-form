import EmberRouter from '@ember/routing/router';
import config from 'frontend-complaint-form/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('mock-login');
  this.route('complaint-form');
  this.route('confirmation', { path: '/complaint-form-confirmation' });
  this.route('complaints', { path: '/klachten' }, function () {
    this.route('details', { path: `/:id` });
  });
  this.route('file-redirect', { path: '/files/:id/download' });

  this.route('route-not-found', {
    path: '/*wildcard',
  });
});
