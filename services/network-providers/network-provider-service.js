class NetworkProviderService {

  constructor() {
    this.events = {};
  }

  get provider() {
    throw new Error('get provider should be implemented');
  }

  enable() {
    throw new Error('enable method should be implemented');
  }

  on(nameEvent, fn) {
    if (!this.events[nameEvent]) {
      this.events[nameEvent] = [];
    }
    this.events[nameEvent].push(fn);

    return () => {
      this.events[nameEvent] = this.events[nameEvent].filter((eventFn) => fn !== eventFn);
    };
  }

  emit(nameEvent, data) {
    const event = this.events[nameEvent];
    if (event) {
      event.forEach((fn) => {
        fn.call(null, data);
      });
    }
  }

  clearEvents() {
    this.events = {};
  }

}

module.exports = NetworkProviderService;
