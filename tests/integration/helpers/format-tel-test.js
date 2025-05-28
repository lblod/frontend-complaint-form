import formatTel from 'frontend-complaint-form/helpers/format-tel';
import { module, test } from 'qunit';

module('Unit | Helper | format-tel', function () {
  test('it supports numbers with a + country prefix', function (assert) {
    assert.strictEqual(
      formatTel('+3221524562'),
      '+32 2 152 45 62',
      'it supports phone numbers with single digit area code',
    );
    assert.strictEqual(
      formatTel('+3215451825'),
      '+32 15 45 18 25',
      'it supports phone numbers with a double digit area code',
    );
    assert.strictEqual(
      formatTel('+32482455642'),
      '+32 482 45 56 42',
      'it supports mobile phone numbers',
    );
  });

  test('it supports numbers with a 00 country prefix', function (assert) {
    assert.strictEqual(
      formatTel('003221524562'),
      '+32 2 152 45 62',
      'it supports phone numbers with a single digit area code',
    );
    assert.strictEqual(
      formatTel('003215451825'),
      '+32 15 45 18 25',
      'it supports phone numbers with a double digit area code',
    );
    assert.strictEqual(
      formatTel('0032482455642'),
      '+32 482 45 56 42',
      'it supports mobile phone numbers',
    );
  });

  test('it supports Belgian national numbers', function (assert) {
    assert.strictEqual(
      formatTel('021524562'),
      '+32 2 152 45 62',
      'it supports phone numbers with a single digit area code',
    );
    assert.strictEqual(
      formatTel('015451825'),
      '+32 15 45 18 25',
      'it supports phone numbers with a double digit area code',
    );
    assert.strictEqual(
      formatTel('0482455642'),
      '+32 482 45 56 42',
      'it supports mobile phone numbers',
    );
  });

  test('it ignores existing formatting patterns', function (assert) {
    assert.strictEqual(formatTel('02/152.45.62'), '+32 2 152 45 62');
    assert.strictEqual(formatTel('0482/45 56 42'), '+32 482 45 56 42');
    assert.strictEqual(formatTel('021 524 562'), '+32 2 152 45 62');
    assert.strictEqual(formatTel('0 2 1 5 2 4 5 6 2'), '+32 2 152 45 62');
    assert.strictEqual(formatTel('0482 45 56 42'), '+32 482 45 56 42');
  });

  test('it supports special phone numbers', function (assert) {
    assert.strictEqual(
      formatTel('112'),
      '112',
      'it supports the special, 3 digit numbers',
    );
    assert.strictEqual(
      formatTel('1733'),
      '1733',
      'it supports the special, 4 digit numbers',
    );
    assert.strictEqual(
      formatTel('08001080'),
      '0800 10 80',
      'it supports the special 0800 numbers with an even amount of digits',
    );
    assert.strictEqual(
      formatTel('080010800'),
      '0800 10 800',
      'it supports the special 0800 numbers with an odd amount of digits',
    );
  });

  test("it does a best-effort attempt at formatting numbers that we don't explicitly support yet", function (assert) {
    assert.strictEqual(formatTel('116000'), '11 60 00');

    assert.strictEqual(
      formatTel('+31201441618'),
      '+31 201 44 16 18',
      // 'it formats dutch numbers using general pattern, without special casing the dutch area codes',
    );

    assert.strictEqual(
      formatTel('0123456789012345'),
      '01 23 45 67 89 01 23 45',
    );
  });

  test('it returns an empty string if a falsy value is provided', function (assert) {
    assert.strictEqual(formatTel(undefined), '');
    assert.strictEqual(formatTel(''), '');
  });

  test('it asserts the correct amount of arguments', function (assert) {
    assert.throws(() => {
      formatTel();
    }, /expected a single phone number string/);

    assert.throws(() => {
      formatTel('1', '2');
    }, /expected a single phone number string/);
  });

  test('it asserts the type of the phone number argument', function (assert) {
    assert.throws(() => {
      formatTel(1234);
    }, /The first argument must be a phone number string/);
  });

  test("it asserts that the phone number doesn't contain the `tel:` prefix", function (assert) {
    assert.throws(() => {
      formatTel('tel:112');
    }, /The phone number string should not start with `tel:`. Please provide the raw number instead./);
  });
});
