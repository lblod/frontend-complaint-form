import Application from 'frontend-complaint-form/app';
import config from 'frontend-complaint-form/config/environment';
import { setApplication } from '@ember/test-helpers';
import { start } from 'ember-qunit';

setApplication(Application.create(config.APP));

start();
