import { Command } from "./Command.js";

export class TurnOnLightCommand extends Command {
  constructor(light) { super(); this.light = light; }
  execute() { this.light.turnOn(); }
  undo() { this.light.turnOff(); }
}
export class TurnOffLightCommand extends Command {
  constructor(light) { super(); this.light = light; }
  execute() { this.light.turnOff(); }
  undo() { this.light.turnOn(); }
}
