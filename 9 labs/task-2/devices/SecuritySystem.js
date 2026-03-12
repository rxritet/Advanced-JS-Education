import { Device } from "./Device.js";

export class SecuritySystem extends Device {
  constructor(name) { super(name, "security"); }
  getDefaultState() { return { armed: false }; }
  arm() { this.updateState({ armed: true }); console.log(`[Security] Armed`); }
  disarm() { this.updateState({ armed: false }); console.log(`[Security] Disarmed`); }
}
