import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ComplaintFormController extends Controller {
  @service store;

  @tracked showErrors = new ShowErrors();
  @tracked saveComplaintError;

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

  saveComplaint = task({ drop: true }, async () => {
    try {
      this.saveComplaintError = undefined;
      const complaint = this.model;
      complaint.created = new Date();
      return complaint.save();
    } catch (e) {
      this.saveComplaintError = e.message;
    }
  });

  @action
  async submitComplaint() {
    await this.saveComplaint.perform();
    if (!this.saveComplaintError) {
      this.transitionToRoute('confirmation');
    }
  }

  @action
  async attachFile(fileId) {
    const file = await this.store.findRecord('file', fileId);
    const attachments = await this.model.attachments;
    attachments.push(file);
  }

  @action
  deleteFile(file) {
    //TODO also delete from the server?
    this.model.attachments.removeObject(file);
  }

  @action
  changeModel(value, event) {
    this.model[value] = event.target.value;
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
