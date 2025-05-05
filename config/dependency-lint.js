'use strict';

module.exports = {
  generateTests: false,
  allowedVersions: {
    // Our dep tree includes both v3 and v4, which fails the lint but everything works fine.
    // TODO: remove this once we update to Appuniversum v3
    'ember-modifier': '*',
  },
};
