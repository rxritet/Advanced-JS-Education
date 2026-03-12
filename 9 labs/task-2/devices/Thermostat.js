import { Device } from "./Device.js";

export class Thermostat extends Device {
  constructor(name, room) { super(name, "thermostat"); this.room = room; }
  getDefaultState() { return { power: true, targetTemp: 22 }; }
  setTemperature(targetTemp) {
    this.updateState({ targetTemp });
    console.log(`[Thermostat] ${this.name} set to ${targetTemp}°C`);
  }
}
