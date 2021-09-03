import { Assets } from '../constants/assets';
import { Character } from '../models/character';
import { CodeJamGame } from '../models/game';
import { Player } from '../models/player';

export class TilemapScene extends Phaser.Scene {
  constructor(key: string) {
    super(key);
    this.name = key;
    this.tilemapKey = key;
  }

  player?: Player;

  private name: string;

  private tilemapKey: string;
  public tilemap?: Phaser.Tilemaps.Tilemap;

  private upKey!: Phaser.Input.Keyboard.Key;
  private downKey!: Phaser.Input.Keyboard.Key;
  private leftKey!: Phaser.Input.Keyboard.Key;
  private rightKey!: Phaser.Input.Keyboard.Key;

  private collideLayer1!: Phaser.Tilemaps.TilemapLayer;
  private collideLayer2!: Phaser.Tilemaps.TilemapLayer;

  public init(data: any): void {
    this.upKey = this.input.keyboard.addKey('W');
    this.downKey = this.input.keyboard.addKey('S');
    this.leftKey = this.input.keyboard.addKey('A');
    this.rightKey = this.input.keyboard.addKey('D');
  }

  public preload(): void {
    this.load.tilemapTiledJSON(this.tilemapKey, `assets/tilesets/${this.tilemapKey}.json`);
  }

  public create(data: any): void {
    this.tilemap = this.make.tilemap({ key: this.tilemapKey });
    const tilesets = [
      this.tilemap.addTilesetImage('1_Generic_32x32', '1_Generic_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('2_LivingRoom_32x32', '2_LivingRoom_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('3_Bathroom_32x32', '3_Bathroom_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('4_Bedroom_32x32', '4_Bedroom_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('5_Classroom_and_library_32x32', '5_Classroom_and_library_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('6_Music_and_sport_32x32', '6_Music_and_sport_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('7_Art_32x32', '7_Art_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('8_Gym_32x32', '8_Gym_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('9_Fishing_32x32', '9_Fishing_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('10_Birthday_party_32x32', '10_Birthday_party_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('11_Halloween_32x32', '11_Halloween_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('12_Kitchen_32x32', '12_Kitchen_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('13_Conference_Hall_32x32', '13_Conference_Hall_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('14_Basement_32x32', '14_Basement_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('15_Christmas_32x32', '15_Christmas_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('16_Grocery_store_32x32', '16_Grocery_store_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('17_Visibile_Upstairs_System_32x32', '17_Visibile_Upstairs_System_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('18_Jail_32x32', '18_Jail_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('19_Hospital_32x32', '19_Hospital_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('20_Japanese_interiors_32x32', '20_Japanese_interiors_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('21_Clothing_Store_32x32', '21_Clothing_Store_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('serene_village_32x32', 'serene_village_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('room_builder_32x32', 'room_builder_32x32', 32, 32, 1, 2),
      this.tilemap.addTilesetImage('modern_office_32x32', 'modern_office_32x32', 32, 32, 1, 2),
    ];

    this.tilemap.createLayer('BelowLower', tilesets)?.setDepth(0);
    this.tilemap.createLayer('BelowPlayer', tilesets)?.setDepth(2);
    this.collideLayer1 = this.tilemap
      .createLayer('CollideWithPlayer', tilesets)
      .setCollisionBetween(0, 25497, true)
      .setDepth(10);
    this.collideLayer2 = this.tilemap
      .createLayer('CollideDecor', tilesets)
      .setCollisionBetween(0, 25497, true)
      .setDepth(10);
    this.tilemap.createLayer('AbovePlayer', tilesets).setDepth(12);
    this.tilemap.createLayer('AboveHigher', tilesets).setDepth(14);

    const debugGraphics = this.add.graphics().setAlpha(0.75);
    this.collideLayer1.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });
    this.collideLayer2.renderDebug(debugGraphics, {
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255),
      faceColor: new Phaser.Display.Color(40, 39, 37, 255),
    });

    const start = this.tilemap.findObject('Objects', x => x.name === 'Start');
    const spawn = this.tilemap.findObject('Objects', x => x.name == 'Spawn');
    if (start) {
      this.player = new Player(this, start.x || 0, start.y || 0, Assets.Characters.PlayerTrunks);
    } else if (spawn) {
      this.player = new Player(this, spawn.x || 0, spawn.y || 0, Assets.Characters.PlayerDress);
    } else {
      this.player = new Player(this, 1327,1936, Assets.Characters.PlayerDress); // HomeExit on Overworld
    }

    this.cameras.main.startFollow(this.player);
    this.physics.world.setBounds(0, 0, this.tilemap.widthInPixels, this.tilemap.heightInPixels);

    let comms = (this.game as CodeJamGame).comms;

    comms.of().forEach(message => {
      console.log('recieved message', message, this.name);
      if (message.channel === 'teleport' && message.data.scene === this.name) {
        console.log('teleport handler');
        const target = this.tilemap?.findObject('Objects', x => x.name == message.data.target);
        console.log('target');
        if (target && target.x && target.y) {
          console.log('Teleporting to ', target);
          this.player?.setPosition(target.x, target.y - 16);
        }
      }
    });
  }

  public update(time: number, delta: number): void {
    this.physics.collide(this.collideLayer1, this.player);
    this.physics.collide(this.collideLayer2, this.player);

    (this.game as CodeJamGame).teleportCooldown -= delta;

    const keyPressed = {
      left: this.leftKey.isDown,
      right: this.rightKey.isDown,
      up: this.upKey.isDown,
      down: this.downKey.isDown,
    };
    this.player?.updatePlayer(keyPressed);
  }

  public checkTeleport(zone: Phaser.GameObjects.Zone | undefined, targetScene: string, target: string) {
    if (zone && (this.game as CodeJamGame).teleportCooldown <= 0) {
      this.physics.overlap(zone, this.player, () => {
        (this.game as CodeJamGame).teleportCooldown = 20;
        this.scene.switch(targetScene);
        (this.game as CodeJamGame).comms.publish({
          channel: 'teleport',
          data: { scene: targetScene, target: target },
        });
      });
    }
  }

  public addZone(name: string): Phaser.GameObjects.Zone | undefined {
    const obj = this.tilemap?.findObject('Objects', x => x.name === name);
    if (obj && obj.x && obj.y && obj.width && obj.height) {      
      const zone = this.add.zone(obj.x, obj.y, obj.width, obj.height);
      zone.setOrigin(0,0);
      this.physics.add.existing(zone);      
      return zone;
    }
    return undefined;
  }
}
