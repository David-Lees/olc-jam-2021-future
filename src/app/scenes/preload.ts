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

    this.scene.launch('home');
  }

  protected preload() {
    this.loadAssets();
  }

  private loadAssets() {
    // Images
    this.load.image(
      '1_Generic_32x32',
      'assets/tilesets/1_Generic_32x32_extruded.png'
    );
    this.load.image(
      '2_LivingRoom_32x32',
      'assets/tilesets/2_LivingRoom_32x32_extruded.png'
    );
    this.load.image(
      '3_Bathroom_32x32',
      'assets/tilesets/3_Bathroom_32x32_extruded.png'
    );
    this.load.image(
      '4_Bedroom_32x32',
      'assets/tilesets/4_Bedroom_32x32_extruded.png'
    );
    this.load.image(
      '5_Classroom_and_library_32x32',
      'assets/tilesets/5_Classroom_and_library_32x3_extruded.png'
    );
    this.load.image(
      '6_Music_and_sport_32x32',
      'assets/tilesets/6_Music_and_sport_32x32.png'
    );
    this.load.image(
      '7_Art_32x32',
      'assets/tilesets/7_Art_32x32_extruded.png'
    );
    this.load.image(
      '8_Gym_32x32',
      'assets/tilesets/8_Gym_32x32_extruded.png'
    );
    this.load.image(
      '9_Fishing_32x32',
      'assets/tilesets/9_Fishing_32x32_extruded.png'
    );
    this.load.image(
      '10_Birthday_party_32x32',
      'assets/tilesets/10_Birthday_party_32x32_extruded.png'
    );
    this.load.image(
      '11_Halloween_32x32',
      'assets/tilesets/11_Halloween_32x32_extruded.png'
    );
    this.load.image(
      '12_Kitchen_32x32',
      'assets/tilesets/12_Kitchen_32x32_extruded.png'
    );
    this.load.image(
      '13_Conference_Hall_32x32',
      'assets/tilesets/13_Conference_Hall_32x32_extruded.png'
    );
    this.load.image(
      '14_Basement_32x32',
      'assets/tilesets/14_Basement_32x32_extruded.png'
    );
    this.load.image(
      '15_Christmas_32x32',
      'assets/tilesets/15_Christmas_32x32_extruded.png'
    );
    this.load.image(
      '16_Grocery_store_32x32',
      'assets/tilesets/16_Grocery_store_32x32_extruded.png'
    );
    this.load.image(
      '17_Visibile_Upstairs_System_32x32',
      'assets/tilesets/17_Visibile_Upstairs_System_32x32_extruded.png'
    );
    this.load.image(
      '18_Jail_32x32',
      'assets/tilesets/18_Jail_32x32_extruded.png'
    );
    this.load.image(
      '19_Hospital_32x32',
      'assets/tilesets/19_Hospital_32x32_extruded.png'
    );
    this.load.image(
      '20_Japanese_interiors_32x32',
      'assets/tilesets/20_Japanese_interiors_32x32_extruded.png'
    );
    this.load.image(
      '21_Clothing_Store_32x32',
      'assets/tilesets/21_Clothing_Store_32x32_extruded.png'
    );
    this.load.image(
      'serene_village_32x32',
      'assets/tilesets/serene_village_32x32_extruded.png'
    );
    this.load.image(
      'room_builder_32x32',
      'assets/tilesets/room_builder_32x32_extruded.png'
    );
    this.load.image(
      'modern_office_32x32',
      'assets/tilesets/modern_office_32x32_extruded.png'
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
    this.load.spritesheet('mother', 'assets/sprites/mother.png', {
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
