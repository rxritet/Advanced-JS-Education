import { NotificationFactory } from "./NotificationFactory.js";

function sendNotification(type, options, message) {
  try {
    const notification = NotificationFactory.create(type, options);
    return notification.send(message);
  } catch (error) {
    console.error("Failed to send notification:", error.message);
    return { success: false, error: error.message };
  }
}

// Демо всех типов
sendNotification("email", { to: "user@example.com", subject: "Добро пожаловать!" }, "Привет, Радмир!");
sendNotification("sms",   { to: "+77001234567" }, "Ваш код: 123456");
sendNotification("push",  { deviceToken: "tok_abc123", title: "Новое уведомление" }, "У вас новое сообщение");

// Демо полиморфизма: один цикл для всех типов
console.log("\n--- Поддерживаемые типы ---");
const types = NotificationFactory.getSupportedTypes();
console.log(types); // ["email", "sms", "push"]

// Демо обработки ошибки
sendNotification("fax", { to: "..." }, "test"); // Unknown notification type: fax

// Демо полиморфизма через массив
const notifications = [
  NotificationFactory.create("email", { to: "a@b.com", subject: "Test" }),
  NotificationFactory.create("sms",   { to: "+77009876543" }),
  NotificationFactory.create("push",  { deviceToken: "tok_xyz", title: "Alert" }),
];
notifications.forEach(n => n.send("Полиморфное сообщение")); // один интерфейс, разные реализации
