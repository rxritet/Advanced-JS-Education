// SCENARIO_02 – Legacy Payment Gateway Adapter
// Pattern: Adapter (Structural, Ch. 6 / Ch. 7 "The Facade Pattern" & Adapter from GoF table)

// Legacy интерфейс, который менять нельзя
const LegacyBankGateway = {
  processPayment(cardNumber, amount, currencyCode) {
    console.log(
      `[SCENARIO_02][LegacyGateway] Charged ${amount} ${currencyCode}` +
      ` to card ending ${String(cardNumber).slice(-4)}`
    );
    return { success: true, transactionId: `TXN-${Date.now()}` };
  }
};

// Адаптер, приводящий современный интерфейс к legacy-вызову
class PaymentAdapter {
  constructor(legacyGateway) {
    // Сохраняем ссылку на старый шлюз (композиция)
    this.legacyGateway = legacyGateway;
  }

  // Современный интерфейс, ожидаемый checkout-кодом
  // charge({ amount, currency, cardToken })
  charge({ amount, currency, cardToken }) {
    // Adapter: переводим современный объект параметров
    // в позиционные аргументы legacy-метода
    const cardNumber = cardToken;
    const currencyCode = currency;

    // Делегируем вызов в legacy API
    return this.legacyGateway.processPayment(cardNumber, amount, currencyCode);
  }
}

// Demo: checkout-код работает только с новым интерфейсом,
// но под капотом используется legacy-шлюз
const adapter = new PaymentAdapter(LegacyBankGateway);

const result = adapter.charge({
  amount: 15000,
  currency: 'KZT',
  cardToken: '4111111111111111'
});

console.log('[SCENARIO_02] Result:', result);
