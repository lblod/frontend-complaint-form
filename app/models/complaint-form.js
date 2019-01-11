import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  name: attr('string'),
  contactPersonName: attr('string'),
  street: attr('string'),
  houseNumber: attr('string'),
  addressComplement: attr('string'),
  locality: attr('string'),
  postalCode: attr('string'),
  telephone: attr('string'),
  email: attr('string'),
  content: attr('string'),
  created: attr('date')
});
