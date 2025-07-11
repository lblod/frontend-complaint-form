import Model, { attr, hasMany } from '@ember-data/model';

export default class UserModel extends Model {
  @attr firstName;
  @attr familyName;

  @hasMany('account', {
    inverse: 'user',
    async: false,
  })
  accounts;

  @hasMany('administrative-unit', {
    inverse: null,
    async: false,
  })
  groups;
}
