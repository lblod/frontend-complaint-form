import Model, { attr } from '@ember-data/model';

export default class FileAddress extends Model {
  @attr() address;
}
