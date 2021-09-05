import { Assets } from '../constants/assets';
import { DialogTree } from '../constants/conversations';
import { Orientation } from '../constants/orientation';
import { TilemapScene } from '../scenes/tilemap-scene';
import { Character } from './character';

export class Enemy extends Character {
  public static WANDER_DELAY = () => 1000 + 1000 * Math.random();
  public static WANDER_LENGTH = () => 1000 + 5000 * Math.random();

  public conversation: DialogTree | undefined;

  protected CHASING_DISTANCE = 128;

  private chasingPlayerTimerEvent!: Phaser.Time.TimerEvent | null;

  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite);
    this.body.setSize(32, 32, true);
    this.body.setOffset(0, 32);
    this.setCollideWorldBounds(true);
    this.setDepth(10);
  }

  public updateMonster() {
    if (!this.active) {
      return;
    }
    this.handleChase();
  }

  private shouldChase = () => {
    const playerPoint = (this.scene as TilemapScene).player?.getCenter();
    if (playerPoint) {
      const monsterPoint = this.getCenter();
      const distance = monsterPoint.distance(playerPoint);

      if (distance < this.CHASING_DISTANCE) {
        return true;
      }
    }

    return false;
  };

  private moveTowardsPlayer() {
    if (!this.active) {
      return;
    }

    const playerPoint = (this.scene as TilemapScene).player?.getCenter();
    if (playerPoint) {
      const monsterPoint = this.getCenter();
      const { x, y } = playerPoint.subtract(monsterPoint);

      this.run(x, y);
    }
  }

  private startChasing() {
    this.chasingPlayerTimerEvent = this.scene.time.addEvent({
      delay: 500,
      callback: this.moveTowardsPlayer,
      callbackScope: this,
      repeat: Infinity,
      startAt: 2000,
    });
  }

  private stopChasing() {
    if (this.active) {
      this.stopRunning();
    }
    this.chasingPlayerTimerEvent?.destroy();
    this.chasingPlayerTimerEvent = null;
  }

  private handleChase() {
    if (!this.chasingPlayerTimerEvent && this.shouldChase()) {
      this.startChasing();
      return;
    }

    if (this.chasingPlayerTimerEvent && !this.shouldChase()) {
      this.stopChasing();
    }

    if (!this.shouldChase()) {
      this.wanderAround();
    }
  }

  protected SPEED = 100;
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

    this.play('thug-' + Assets.Animations.Move[orientation], true);
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
