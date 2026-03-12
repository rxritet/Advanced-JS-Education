import { Device } from "./Device.js";

export class Light extends Device {
  constructor(name, room) { super(name, "light"); this.room = room; }
  getDefaultState() { return { power: false, brightness: 100 }; }
  turnOn() { this.updateState({ power: true }); console.log(`[Light] ${this.name} ON`); }
  turnOff() { this.updateState({ power: false }); console.log(`[Light] ${this.name} OFF`); }
  setBrightness(level) {
    this.updateState({ brightness: Math.max(0, Math.min(100, level)) });
  }
}
