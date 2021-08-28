import { Assets } from '../constants/assets';

export class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }

  protected create() {
    for (const key in Assets.Characters) {
      if (Assets.Characters.hasOwnProperty(key))
        this.createAnimations(Assets.Characters[key]);
    }

    this.scene.launch('hospital');
  }

  protected preload() {
    this.loadAssets();
  }

  private loadAssets() {
    // Images
    this.load.image('Modern Interiors', 'assets/tilesets/interiors_32x32.png');
    this.load.image(
      'Serene_Village_32x32',
      'assets/tilesets/serene_village_32x32.png'
    );
    this.load.image(
      'Modern Interior Room Builder',
      'assets/tilesets/room_builder_32x32.png'
    );

    // Spritesheets
    this.load.spritesheet('player-trunks', 'assets/sprites/player-trunks.png', {
      frameWidth: 32,
      frameHeight: 64,
    });
    this.load.spritesheet('player-dress', 'assets/sprites/player-dress.png', {
      frameWidth: 32,
      frameHeight: 64,
    });

    // Sprites
  }

  private createAnimations(name: string) {
    const row = 56;
    this.anims.create({
      key: `${name}-${Assets.Animations.Move.Right}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: this.i(0, 2),
        end: this.i(5, 2),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Move.Up}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: this.i(6, 2),
        end: this.i(11, 2),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Move.Left}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: this.i(12, 2),
        end: this.i(17, 2),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Move.Down}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: this.i(18, 2),
        end: this.i(23, 2),
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `${name}-${Assets.Animations.Idle.Right}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: this.i(0,0),
        end: this.i(0,0),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Idle.Up}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: this.i(1,0),
        end: this.i(1,0)
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Idle.Left}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: this.i(2,0),
        end: this.i(2,0),
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Idle.Down}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: this.i(3,0),
        end:  this.i(3,0),
      }),
      frameRate: 10,
      repeat: -1,
    });
  }

  private i(x: number, y: number): number {
    return (y * 56) + x;

  }
}
