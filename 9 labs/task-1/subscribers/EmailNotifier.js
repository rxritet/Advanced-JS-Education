import eventBus from "../pubsub/EventBus.js";

export class EmailNotifier {
  constructor(email) {
    this.email = email;
    this.subscriptions = [];
  }
  subscribe(categories) {
    categories.forEach(category => {
      const unsub = eventBus.subscribe(`news:${category}`, (article) => {
        console.log(`[Email -> ${this.email}] Subj: ${article.headline} | Priority: ${article.priority}`);
      });
      this.subscriptions.push(unsub);
    });
  }
  unsubscribe() {
    this.subscriptions.forEach(unsub => unsub());
    this.subscriptions = [];
  }
}
