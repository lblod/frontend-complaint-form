import { module, test } from 'qunit';
import { setupTest } from 'frontend-complaint-form/tests/helpers';
import { validationSchema } from 'frontend-complaint-form/models/complaint-form';
import { validateRecord } from 'frontend-complaint-form/utils/validate-record';

module('Unit | Model | complaint form', function (hooks) {
  setupTest(hooks);

  test('validations', async function (assert) {
    let store = this.owner.lookup('service:store');
    let complaintForm = store.createRecord('complaint-form');

    let result = await validateRecord(complaintForm, validationSchema);
    assert.false(result.isValid, 'an empty record is invalid');
    assert.ok(result.errors.name, 'invalid name');
    assert.ok(result.errors.street, 'invalid street');
    assert.ok(result.errors.houseNumber, 'invalid house number');
    assert.ok(result.errors.locality, 'invalid locality');
    assert.ok(result.errors.postalCode, 'invalid postal code');
    assert.ok(result.errors.email, 'invalid email');
    assert.ok(result.errors.content, 'invalid content');

    complaintForm.name = '';
    complaintForm.street = '';
    complaintForm.houseNumber = '';
    complaintForm.locality = '';
    complaintForm.postalCode = '';
    complaintForm.telephone = '';
    complaintForm.email = '';
    complaintForm.content = '';

    result = await validateRecord(complaintForm, validationSchema);
    assert.false(result.isValid, 'empty strings are ignored');

    complaintForm.name = 'Jane Doe';
    complaintForm.street = 'Foostraat';
    complaintForm.houseNumber = '2';
    complaintForm.locality = 'Bar';
    complaintForm.postalCode = '1234';
    complaintForm.telephone = '+32499112233';
    complaintForm.email = 'foo@bar.be';
    complaintForm.content = 'I have a complaint!';

    result = await validateRecord(complaintForm, validationSchema);
    assert.true(result.isValid);
    assert.notOk(result.errors);

    complaintForm.houseNumber = '2A';
    complaintForm.postalCode = '1000000000';
    complaintForm.email = 'foobar.be';
    complaintForm.telephone = 'ABCD';
    result = await validateRecord(complaintForm, validationSchema);
    assert.false(result.isValid);
    assert.ok(
      result.errors.houseNumber,
      'house number can only contain digits',
    );
    assert.ok(result.errors.postalCode, 'postal code must be within a range');
    assert.ok(result.errors.telephone, 'telephone must be valid');
    assert.ok(result.errors.email, 'email must be valid');
  });
});
