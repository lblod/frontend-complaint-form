import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class MockLoginController extends Controller {
  queryParams = ['page', 'size'];

  @tracked page = 0;
  size = 10;
}
