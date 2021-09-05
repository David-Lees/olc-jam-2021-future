import { Character } from "./character";

export class Tank extends Character {
    constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
      super(scene, x, y, sprite);
      this.body.setSize(138, 64, true);
      this.body.setOffset(0, 0);
      this.setDepth(10);
    }
}