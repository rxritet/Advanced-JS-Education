// test/benchmark.js - Very rough comparison flyweight vs non-flyweight

import treeFactory from "../tree/TreeFactory.js";
import { FlyweightTree } from "../tree/FlyweightTree.js";

function createNonFlyweightTrees(count) {
  const trees = [];
  for (let i = 0; i < count; i++) {
    const t = new FlyweightTree(
      "oak",
      "Oak",
      "#006400",
      "#654321",
      60,
      40
    );
    trees.push({
      type: t.type,
      species: t.species,
      foliageColor: t.foliageColor,
      trunkColor: t.trunkColor,
      height: t.height,
      width: t.width,
      x: Math.random() * 1000,
      y: Math.random() * 600,
      scale: 0.5 + Math.random(),
      rotation: Math.random() * Math.PI * 2,
    });
  }
  return trees;
}

function createFlyweightTrees(count) {
  const trees = [];
  for (let i = 0; i < count; i++) {
    const fly = treeFactory.getTree(
      "oak",
      "Oak",
      "#006400",
      "#654321",
      60,
      40
    );
    trees.push({
      flyweight: fly,
      x: Math.random() * 1000,
      y: Math.random() * 600,
      scale: 0.5 + Math.random(),
      rotation: Math.random() * Math.PI * 2,
    });
  }
  return trees;
}

// Пример запуска в браузере с подключением через type="module"
const COUNT = 10000;
console.time("non-flyweight");
const nf = createNonFlyweightTrees(COUNT);
console.timeEnd("non-flyweight");

console.time("flyweight");
const fw = createFlyweightTrees(COUNT);
console.timeEnd("flyweight");

console.log("non-flyweight length:", nf.length);
console.log("flyweight length:", fw.length);
console.log("factory stats:", treeFactory.getStats());
