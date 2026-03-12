export class EventBus {
  constructor() {
    this.events = new Map();
    this.onceEvents = new Map();
  }
  subscribe(event, callback) {
    if (!this.events.has(event)) this.events.set(event, []);
    const subscribers = this.events.get(event);
    subscribers.push(callback);
    return () => {
      const index = subscribers.indexOf(callback);
      if (index > -1) subscribers.splice(index, 1);
    };
  }
  subscribeOnce(event, callback) {
    if (!this.onceEvents.has(event)) this.onceEvents.set(event, []);
    this.onceEvents.get(event).push(callback);
  }
  publish(event, data) {
    if (this.onceEvents.has(event)) {
      this.onceEvents.get(event).forEach(cb => cb(data));
      this.onceEvents.delete(event);
    }
    if (this.events.has(event)) {
      this.events.get(event).forEach(cb => {
        try { cb(data); } catch (e) { console.error(e); }
      });
    }
  }
}
export default new EventBus();
