// FlyweightTree.js - Intrinsic state (shared)
export class FlyweightTree {
  constructor(type, species, foliageColor, trunkColor, height, width) {
    // Intrinsic: shared
    this.type = type;
    this.species = species;
    this.foliageColor = foliageColor;
    this.trunkColor = trunkColor;
    this.height = height;
    this.width = width;

    Object.freeze(this); // делаем состояние неизменяемым
  }

  render(ctx, x, y, scale, rotation) {
    // Extrinsic: x, y, scale, rotation — приходят снаружи
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    ctx.scale(scale, scale);

    // Trunk
    ctx.fillStyle = this.trunkColor;
    ctx.fillRect(-this.width / 4, 0, this.width / 2, this.height / 3);

    // Foliage
    ctx.fillStyle = this.foliageColor;
    ctx.beginPath();
    ctx.moveTo(0, -this.height);
    ctx.lineTo(-this.width, this.height / 3);
    ctx.lineTo(this.width, this.height / 3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  getInfo() {
    return `${this.species} (${this.type})`;
  }
}
