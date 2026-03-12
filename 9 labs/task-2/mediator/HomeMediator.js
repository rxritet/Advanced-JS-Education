import eventBus from "../../task1/pubsub/EventBus.js";

export class HomeMediator {
  constructor() {
    this.devices = new Map();
    this.automationRules = [];
  }
  registerDevice(device) {
    this.devices.set(device.name, device);
    device.setMediator(this);
  }
  notify(sender, changedProperty) {
    console.log(`[Mediator] ${sender.name} changed:`, changedProperty);
    eventBus.publish("device:change", { device: sender.name, state: changedProperty });
    this.automationRules.forEach(rule => {
      if (rule.condition(sender, changedProperty)) rule.action(sender, changedProperty);
    });
  }
  addRule(condition, action) {
    this.automationRules.push({ condition, action });
  }
}
