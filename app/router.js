import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('complaint-form');

  this.route('route-not-found', {
    path: '/*wildcard'
  });
  this.route('confirmation', { path: '/complaint-form-confirmation' });
});

export default Router;
