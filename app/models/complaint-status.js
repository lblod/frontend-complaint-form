import Model, { attr, hasMany } from '@ember-data/model';

export default class ComplaintStatus extends Model {
  @attr uri;
  @attr label;
  @hasMany('complaint-form', { async: false, inverse: 'status' }) complaintForms;
}

const SENT_STATUS =
  'http://lblod.data.gift/concepts/9bd8d86d-bb10-4456-a84e-91e9507c374c';

export {SENT_STATUS };
