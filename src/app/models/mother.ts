import { Character } from "./character";

export class Mother extends Character {
  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite);

    scene.physics.add.existing(this);
    this.setDepth(10);

    this.body.setSize(32, 32, true);
    this.body.setOffset(0, 32);
  }
}