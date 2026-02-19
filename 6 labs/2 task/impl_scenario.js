class AppConfig {
  constructor() {
    // Singleton guard: запрещаем создавать второй экземпляр
    if (AppConfig._instance) {
      return AppConfig._instance;
    }

    // Хранение конфигурации (состояние Singleton)
    this.settings = {
      apiBaseUrl: 'https://api.example.com/v1',
      locale: 'kk-KZ',
      featureFlags: { darkMode: true, betaCheckout: false }
    };

    AppConfig._instance = this;
  }

  get(key) {
    return this.settings[key];
  }

  // Запись значения по ключу
  set(key, value) {
    this.settings[key] = value;
  }

  static getInstance() {
    if (!AppConfig._instance) {
      AppConfig._instance = new AppConfig();
    }
    return AppConfig._instance;
  }
}

const cfg1 = AppConfig.getInstance();
const cfg2 = AppConfig.getInstance();

console.log('[SCENARIO_01] cfg1 === cfg2?', cfg1 === cfg2); // true

console.log('[SCENARIO_01] apiBaseUrl before:', cfg1.get('apiBaseUrl'));
cfg1.set('apiBaseUrl', 'https://api.example.com/v2');
console.log('[SCENARIO_01] apiBaseUrl after:', cfg2.get('apiBaseUrl'));