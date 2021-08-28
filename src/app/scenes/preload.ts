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
    this.load.image('Modern Interiors', 'assets/tilesets/Interiors_32x32.png');
    this.load.image('Serene_Village_32x32', 'assets/tilesets/Serene_village');
    this.load.image(
      'Modern Interior Room Builder',
      'assets/tilesets/Room_Builder_32x32.png'
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
        start: row * 3,
        end: row * 3 + 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Move.Up}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: row * 3 + 6,
        end: row * 3 + 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Move.Left}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: row * 3 + 12,
        end: row * 3 + 17,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Move.Down}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: row * 3 + 18,
        end: row * 3 + 23,
      }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: `${name}-${Assets.Animations.Idle.Right}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: row * 2,
        end: row * 2 + 5,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Idle.Up}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: row * 2 + 6,
        end: row * 2 + 11,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Idle.Left}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: row * 2 + 12,
        end: row * 2 + 17,
      }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: `${name}-${Assets.Animations.Idle.Down}`,
      frames: this.anims.generateFrameNumbers(name, {
        start: row * 2 + 18,
        end: row * 2 + 23,
      }),
      frameRate: 10,
      repeat: -1,
    });
  }
}
