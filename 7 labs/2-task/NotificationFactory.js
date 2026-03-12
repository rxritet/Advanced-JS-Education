import { EmailNotification } from "./notification/EmailNotification.js";
import { SMSNotification }   from "./notification/SMSNotification.js";
import { PushNotification }  from "./notification/PushNotification.js";

export class NotificationFactory {
  static create(type, options) {
    switch (type) {
      case "email":
        return new EmailNotification(options.to, options.subject);
      case "sms":
        return new SMSNotification(options.to);
      case "push":
        return new PushNotification(options.deviceToken, options.title);
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }
  }

  static getSupportedTypes() {
    return ["email", "sms", "push"];
  }
}
