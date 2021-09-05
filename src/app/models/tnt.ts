import { Character } from "./character";

export class Tnt extends Character {
  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite);
    this.setDepth(100);
    this.body.setSize(32, 32, true);
  }
}