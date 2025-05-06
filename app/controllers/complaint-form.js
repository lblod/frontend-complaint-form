import Controller from '@ember/controller';
import { action } from '@ember/object';
import { task } from 'ember-concurrency';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { validateRecord } from '../utils/validate-record';
import { validationSchema } from '../models/complaint-form';

export default class ComplaintFormController extends Controller {
  @service store;
  @service router;

  @tracked showErrors = new ShowErrors();
  @tracked errors = {};
  @tracked saveComplaintError;

  get nameIsInvalid() {
    return this.showErrors.name && this.errors.name;
  }

  get streetIsInvalid() {
    return this.showErrors.street && this.errors.street;
  }

  get houseNumberIsInvalid() {
    return this.showErrors.houseNumber && this.errors.houseNumber;
  }

  get postalCodeIsInvalid() {
    return this.showErrors.postalCode && this.errors.postalCode;
  }

  get localityIsInvalid() {
    return this.showErrors.locality && this.errors.locality;
  }

  get telephoneIsInvalid() {
    return this.showErrors.telephone && this.errors.telephone;
  }

  get emailIsInvalid() {
    return this.showErrors.email && this.errors.email;
  }

  get contentIsInvalid() {
    return this.showErrors.content && this.errors.content;
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
      await complaint.save();
    } catch (e) {
      this.saveComplaintError = e.message;
    }
  });

  @action
  async submitComplaint(event) {
    event.preventDefault();

    let result = await validateRecord(this.model, validationSchema);

    if (result.isValid) {
      this.errors = {};
      await this.saveComplaint.perform();
      if (!this.saveComplaintError) {
        this.router.transitionTo('confirmation');
      }
    } else {
      this.errors = result.errors;
    }
    this.showErrors.showAll();
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
    this.showErrors[value] = false;
    this.model[value] = event.target.value;
  }
}

class ShowErrors {
  @tracked name = false;
  @tracked street = false;
  @tracked houseNumber = false;
  @tracked postalCode = false;
  @tracked locality = false;
  @tracked telephone = false;
  @tracked email = false;
  @tracked content = false;

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

  showAll() {
    this.name = true;
    this.street = true;
    this.houseNumber = true;
    this.postalCode = true;
    this.locality = true;
    this.telephone = true;
    this.email = true;
    this.content = true;
  }
}
