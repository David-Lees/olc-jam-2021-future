import { Assets } from "../constants/assets";
import { Orientation } from "../constants/orientation";
import { Character } from "./character";
import { Enemy } from "./enemy";

export class Ted extends Character {
  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite);
    this.body.setSize(32, 32, true);
    this.body.setOffset(0, 32);
    this.setCollideWorldBounds(true);
    this.setDepth(10);
  }

  public updateTed() {
    if (!this.active) {
      return;
    }
    this.wanderAround();
  }

  protected SPEED = 150;
  private isWandering = false;

  public wanderAround() {
    if (this.isWandering) {
      return;
    }

    this.isWandering = true;

    const direction = this.getRandomDirection();
    this.run(direction.x, direction.y);

    this.scene.time.addEvent({
      delay: Enemy.WANDER_LENGTH(),
      callbackScope: this,
      callback: () => {
        this.stopRunning();

        if (!this.active) {
          return;
        }

        this.scene.time.addEvent({
          delay: Enemy.WANDER_DELAY(),
          callbackScope: this,
          callback: () => {
            this.isWandering = false;
          },
        });
      },
    });
  }

  private beIdle() {
    this.play(Assets.Animations.Idle.Down);
  }

  protected stopRunning() {
    if (!this.active) {
      return;
    }

    this.setVelocity(0);
    this.beIdle();
  }

  protected run(x: number, y: number) {
    if (x === 0 && y === 0) {
      return;
    }

    if (!this.active) {
      return;
    }

    this.setVelocityX(Math.sign(x) * this.SPEED);
    this.setVelocityY(Math.sign(y) * this.SPEED);

    const orientation = this.getOrientationFromTargettedPosition(x, y);

    this.play(Assets.Animations.Move[orientation], true);
  }

  private getRandomDirection() {
    const randomBetweenMinusOneAndOne = () => Math.round(2 * Math.random()) - 1;
    const x = randomBetweenMinusOneAndOne();
    const y = randomBetweenMinusOneAndOne();

    return { x, y };
  }

  protected getOrientationFromTargettedPosition(x: number, y: number): Orientation {
    if (Math.abs(y) > Math.abs(x)) {
      return y < 0 ? Orientation.Up : Orientation.Down;
    }

    return x < 0 ? Orientation.Left : Orientation.Right;
  }
}