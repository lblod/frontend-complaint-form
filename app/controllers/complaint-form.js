import Controller from '@ember/controller';
import { task } from 'ember-concurrency';
import { computed } from '@ember/object';
import { or } from '@ember/object/computed';

export default Controller.extend({
  showErrors: computed('_showErrors',  {
    get() {
      return this._showErrors || {
        name: false,
        street: false,
        houseNumber: false,
        postalCode: false,
        locality: false,
        telephone: false,
        email: false,
        content: false
      };
    },

    set(key, value) {
      this.set('_showErrors', value);
      return this._showErrors;
    }
  }),

  nameIsInvalid: computed('showErrors.name', 'model.validations.attrs.name.isInvalid', function() {
    return this.showErrors.name && this.model.get('validations.attrs.name.isInvalid');
  }),

  streetIsInvalid: computed('showErrors.street', 'model.validations.attrs.street.isInvalid', function() {
    return this.showErrors.street && this.model.get('validations.attrs.street.isInvalid');
  }),

  houseNumberIsInvalid: computed('showErrors.houseNumber', 'model.validations.attrs.houseNumber.isInvalid', function() {
    return this.showErrors.houseNumber && this.model.get('validations.attrs.houseNumber.isInvalid');
  }),

  postalCodeIsInvalid: computed('showErrors.postalCode', 'model.validations.attrs.postalCode.isInvalid', function() {
    return this.showErrors.postalCode && this.model.get('validations.attrs.postalCode.isInvalid');
  }),

  localityIsInvalid: computed('showErrors.locality', 'model.validations.attrs.locality.isInvalid', function() {
    return this.showErrors.locality && this.model.get('validations.attrs.locality.isInvalid');
  }),

  telephoneIsInvalid: computed('showErrors.telephone', 'model.validations.attrs.telephone.isInvalid', function() {
    return this.showErrors.telephone && this.model.get('validations.attrs.telephone.isInvalid');
  }),

  emailIsInvalid: computed('showErrors.email', 'model.validations.attrs.email.isInvalid', function() {
    return this.showErrors.email && this.model.get('validations.attrs.email.isInvalid');
  }),

  contentIsInvalid: computed('showErrors.content', 'model.validations.attrs.content.isInvalid', function() {
    return this.showErrors.content && this.model.get('validations.attrs.content.isInvalid');
  }),

  formIsInvalid: or(
    'nameIsInvalid',
    'streetIsInvalid',
    'houseNumberIsInvalid',
    'postalCodeIsInvalid',
    'localityIsInvalid',
    'telephoneIsInvalid',
    'emailIsInvalid',
    'contentIsInvalid'
  ),

  saveComplaint: task(function*() {
    try {
      let complaint = this.model;
      complaint.set('created', new Date());
      yield complaint.save();
    } catch (e) {
      this.set('saveComplaintError', e.message);
    }
  }).drop(),

  actions: {
    submitComplaint() {
      this.set('saveComplaintError', null);
      this.saveComplaint.perform();
      if (!this.saveComplaintError) {
        this.transitionToRoute('confirmation');
      }
    },

    attachFile(file) {
      this.model.attachments.pushObject(file);
    },

    deleteFile(file) {
      this.model.attachments.removeObject(file);
    }
  }
});
