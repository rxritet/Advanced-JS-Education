import eventBus from "../pubsub/EventBus.js";

export class PushNotifier {
  constructor(deviceId) {
    this.deviceId = deviceId;
    this.subscriptions = [];
  }
  subscribe(categories) {
    categories.forEach(category => {
      const unsub = eventBus.subscribe(`news:${category}`, (article) => {
        console.log(`[Push -> ${this.deviceId}] 🚨 ${article.headline}`);
      });
      this.subscriptions.push(unsub);
    });
  }
  unsubscribe() {
    this.subscriptions.forEach(unsub => unsub());
    this.subscriptions = [];
  }
}
