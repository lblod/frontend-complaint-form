import Model, { attr, hasMany } from '@ember-data/model';
import Joi from 'joi';

export default class ComplaintForm extends Model {
  @attr name;
  @attr contactPersonName;
  @attr street;
  @attr houseNumber;
  @attr addressComplement;
  @attr locality;
  @attr postalCode;
  @attr telephone;
  @attr email;
  @attr content;
  @attr('datetime') created;
  @hasMany('file', { async: true, inverse: null }) attachments;
}

export const validationSchema = Joi.object({
  name: Joi.string()
    .empty('')
    .required()
    .messages({ '*': 'Het veld Naam is verplicht.' }),
  street: Joi.string()
    .empty('')
    .required()
    .messages({ '*': 'Het veld Straat is verplicht.' }),
  houseNumber: Joi.number()
    .integer()
    .positive()
    .required()
    .messages({ '*': 'Het veld Huisnummer is verplicht.' }),
  locality: Joi.string()
    .empty('')
    .required()
    .messages({ '*': 'Het veld Gemeente of Stad is verplicht.' }),
  postalCode: Joi.number()
    .integer('')
    .min(1000)
    .less(10000)
    .required()
    .messages({
      'any.required': 'Het veld Postcode is verplicht',
      '*': 'Het veld Postcode moet een geldige postcode bevatten.',
    }),
  telephone: Joi.string()
    .empty('')
    .regex(/^(tel:)?\+?[0-9]*$/)
    .required()
    .messages({
      'any.required': 'Het veld telefoonnummer is verplicht.',
      'string.pattern.base':
        'Het veld Telefoonnummer mag enkel een plusteken en cijfers bevatten.',
    }),
  email: Joi.string().empty('').email({ tlds: false }).required().messages({
    '*': 'Het veld E-mailadres moet een geldig e-mailadres bevatten',
  }),
  content: Joi.string()
    .empty('')
    .required()
    .messages({ '*': 'Het veld Omschrijving klacht is verplicht.' }),
});
