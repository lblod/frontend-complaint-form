import DS from 'ember-data';

const { Model, attr } = DS;

export default Model.extend({
  name: attr(),
  contactPersonName: attr(),
  street: attr(),
  houseNumber: attr(),
  addressComplement: attr(),
  locality: attr(),
  postalCode: attr(),
  telephone: attr(),
  email: attr(),
  content: attr(),
  created: attr('date')
});
