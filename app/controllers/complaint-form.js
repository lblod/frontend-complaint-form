import Controller from '@ember/controller';
import { action } from '@ember/object';
import { dropTask } from 'ember-concurrency-decorators';
import { tracked } from '@glimmer/tracking';

export default class ComplaintFormController extends Controller {
  @tracked showErrors = new ShowErrors();

  get nameIsInvalid() {
    return (
      this.showErrors.name && this.model.get('validations.attrs.name.isInvalid')
    );
  }

  get streetIsInvalid() {
    return (
      this.showErrors.street &&
      this.model.get('validations.attrs.street.isInvalid')
    );
  }

  get houseNumberIsInvalid() {
    return (
      this.showErrors.houseNumber &&
      this.model.get('validations.attrs.houseNumber.isInvalid')
    );
  }

  get postalCodeIsInvalid() {
    return (
      this.showErrors.postalCode &&
      this.model.get('validations.attrs.postalCode.isInvalid')
    );
  }

  get localityIsInvalid() {
    return (
      this.showErrors.locality &&
      this.model.get('validations.attrs.locality.isInvalid')
    );
  }

  get telephoneIsInvalid() {
    return (
      this.showErrors.telephone &&
      this.model.get('validations.attrs.telephone.isInvalid')
    );
  }

  get emailIsInvalid() {
    return (
      this.showErrors.email &&
      this.model.get('validations.attrs.email.isInvalid')
    );
  }

  get contentIsInvalid() {
    return (
      this.showErrors.content &&
      this.model.get('validations.attrs.content.isInvalid')
    );
  }

  get formIsInvalid() {
    return (
      this.nameIsInvalid ||
      this.streetIsInvalid ||
      this.houseNumberIsInvalid ||
      this.postalCodeIsInvalid ||
      this.localityIsInvalid ||
      this.telephoneIsInvalid ||
      this.emailIsInvalid ||
      this.contentIsInvalid
    );
  }

  @dropTask
  *saveComplaint() {
    try {
      let complaint = this.model;
      complaint.created = new Date();
      yield complaint.save();
    } catch (e) {
      this.saveComplaintError = e.message;
    }
  }

  @action
  submitComplaint() {
    this.saveComplaintError = null;
    this.saveComplaint.perform();
    if (!this.saveComplaintError) {
      this.transitionToRoute('confirmation');
    }
  }

  @action
  attachFile(file) {
    this.model.attachments.pushObject(file);
  }

  @action
  deleteFile(file) {
    this.model.attachments.removeObject(file);
  }
}

class ShowErrors {
  @tracked name;
  @tracked street;
  @tracked houseNumber;
  @tracked postalCode;
  @tracked locality;
  @tracked telephone;
  @tracked email;
  @tracked content;

  constructor() {
    this.name = false;
    this.street = false;
    this.houseNumber = false;
    this.postalCode = false;
    this.locality = false;
    this.telephone = false;
    this.email = false;
    this.content = false;
  }

  get showErrorObject() {
    return {
      name: this.name,
      street: this.street,
      houseNumber: this.houseNumber,
      postalCode: this.postalCode,
      locality: this.locality,
      telephone: this.telephone,
      email: this.email,
      content: this.content,
    };
  }
}
