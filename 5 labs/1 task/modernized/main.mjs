import { Product, Cart } from "./core.mjs";

const cart = new Cart();
const p1 = new Product(1, "Widget", 10.99);

cart.addItem(p1, 2);
console.log("Total: " + cart.getFormattedTotal());