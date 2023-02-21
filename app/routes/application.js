import Route from "@ember/routing/route";

export default class ApplicationRoute extends Route {
  heightChangeResizeObserver = null;

  constructor() {
    super(...arguments);
    this.setupHeightChangeDetection();
  }

  setupHeightChangeDetection() {
    const resizeObserver = new ResizeObserver((entries) => {
      let body = entries[0].target;
      let newHeight = body.clientHeight;
      window.parent.postMessage({ height: newHeight });
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
