// core.mjs
import { TAX_RATE, CURRENCY } from './config.mjs';
import * as Utils from './utils.mjs';

export class Product {
  #id;
  #name;
  #price;

  constructor(id, name, price) {
    this.#id = id;
    this.#name = name;
    this.#price = price;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get price() {
    return this.#price;
  }
}

export class Cart {
  #items = [];

  addItem(product, quantity) {
    this.#items.push({ product, quantity });
  }

  getSubtotal() {
    return this.#items.reduce(
      (sum, { product, quantity }) => sum + product.price * quantity,
      0
    );
  }

  getTax() {
    return this.getSubtotal() * TAX_RATE;
  }

  getTotal() {
    return this.getSubtotal() + this.getTax();
  }

  getFormattedTotal() {
    return Utils.formatPrice(this.getTotal(), CURRENCY);
  }
}
