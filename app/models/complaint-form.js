import Model, { attr, hasMany } from '@ember-data/model';
import { buildValidations, validator } from 'ember-cp-validations';

const Validations = buildValidations({
  name: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'Het veld Naam is verplicht.',
    }),
  ],
  street: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'Het veld Straat is verplicht.',
    }),
  ],
  houseNumber: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'Het veld Huisnummer is verplicht.',
    }),
    validator('number', {
      allowString: true,
      message: 'Het veld Huisnummer moet een geldig Huisnummer bevatten',
    }),
  ],
  locality: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'Het veld Gemeente of Stad is verplicht.',
    }),
  ],
  postalCode: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'Het veld Postcode is verplicht.',
    }),
    validator('number', {
      allowString: true,
      gte: 1000,
      lt: 10000,
      message: 'Het veld Postcode moet een geldig Postcode bevatten',
    }),
  ],
  telephone: [
    validator('number', {
      allowBlank: true,
      allowString: true,
      message:
        'Het veld Telefoonnummer moet een geldig Telefoonnummer bevatten',
    }),
  ],
  email: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'Het veld Mailadres is verplicht.',
    }),
    validator('format', {
      type: 'email',
      message: 'Het veld Mailadres moet een geldig Mailadres bevatten',
    }),
  ],
  content: [
    validator('presence', {
      presence: true,
      ignoreBlank: true,
      message: 'Het veld Omschrijving klacht is verplicht.',
    }),
  ],
});

export default class ComplaintForm extends Model.extend(Validations) {
  @attr() name;
  @attr() contactPersonName;
  @attr() street;
  @attr() houseNumber;
  @attr() addressComplement;
  @attr() locality;
  @attr() postalCode;
  @attr() telephone;
  @attr() email;
  @attr() content;
  @attr('datetime') created;
  @hasMany('file', { async: true, inverse: null }) attachments;
}
