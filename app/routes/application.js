import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;

  heightChangeResizeObserver = null;

  constructor() {
    super(...arguments);
    this.setupHeightChangeDetection();
  }

  beforeModel() {
    return this.session.setup();
  }

  setupHeightChangeDetection() {
    const resizeObserver = new ResizeObserver((entries) => {
      let body = entries[0].target;
      let newHeight = body.clientHeight;
      window.parent.postMessage({ height: newHeight }, '*');
    });

    resizeObserver.observe(document.body);
    this.heightChangeResizeObserver = resizeObserver;
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.heightChangeResizeObserver.disconnect();
    this.heightChangeResizeObserver = null;
  }
}
