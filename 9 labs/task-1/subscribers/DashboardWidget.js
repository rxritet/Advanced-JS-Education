import eventBus from "../pubsub/EventBus.js";

export class DashboardWidget {
  constructor(widgetName) {
    this.widgetName = widgetName;
    this.articles = [];
  }
  subscribe() {
    this.unsub = eventBus.subscribe("news:all", (article) => {
      this.articles.push(article);
      console.log(`[Dashboard: ${this.widgetName}] Total articles: ${this.articles.length}`);
    });
  }
  unsubscribe() {
    if (this.unsub) this.unsub();
  }
}
