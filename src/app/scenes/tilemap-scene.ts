import { Assets } from "../constants/assets";
import { Character } from "../models/character";
import { Player } from "../models/player";

export class TilemapScene extends Phaser.Scene {
  constructor(key: string) {
    super(key);

    this.tilemapKey = key;
  }

  player?: Player;

  private tilemapKey: string;
  private tilemap?: Phaser.Tilemaps.Tilemap;

  private upKey!: Phaser.Input.Keyboard.Key;
  private downKey!: Phaser.Input.Keyboard.Key;
  private leftKey!: Phaser.Input.Keyboard.Key;
  private rightKey!: Phaser.Input.Keyboard.Key;

  public init(data: any): void {
    this.upKey = this.input.keyboard.addKey('W');
    this.downKey = this.input.keyboard.addKey('S');
    this.leftKey = this.input.keyboard.addKey('A');
    this.rightKey = this.input.keyboard.addKey('D');
  }

  public preload(): void {
    this.load.tilemapTiledJSON(this.tilemapKey);
  }

  public create(data: any): void {    
    this.tilemap = this.make.tilemap({ key: this.tilemapKey });
    const tileset1 = this.tilemap.addTilesetImage('Modern Interiors');
    const tileset2 = this.tilemap.addTilesetImage('Serene_Village_32x32');
    const tileset3 = this.tilemap.addTilesetImage('Modern Interior Room Builder');
    
    const layer1 = this.tilemap.createLayer('BelowLower', [tileset1, tileset2, tileset3]);
    const layer2 = this.tilemap.createLayer('BelowPlayer', [tileset1, tileset2, tileset3]);
    const layer3 = this.tilemap.createLayer('CollidePlayer', [tileset1, tileset2, tileset3]).setCollisionByProperty({ collides: true });
    const layer4 = this.tilemap.createLayer('ColideDecor', [tileset1, tileset2, tileset3]).setCollisionByProperty({ collides: true });;
    const layer5 = this.tilemap.createLayer('AbovePlayer', [tileset1, tileset2, tileset3]);
    const layer6 = this.tilemap.createLayer('AboveHigher', [tileset1, tileset2, tileset3]);
    
    const debugGraphics = this.add.graphics().setAlpha(0.75);
    layer3.renderDebug(debugGraphics, { 
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243,134,48, 255),
      faceColor: new Phaser.Display.Color(40,39,37,255),
    });
    layer4.renderDebug(debugGraphics, { 
      tileColor: null,
      collidingTileColor: new Phaser.Display.Color(243,134,48, 255),
      faceColor: new Phaser.Display.Color(40,39,37,255),
    });

    const spawn = this.tilemap.findObject("Objects", (x: any) => x.name == "Spawn");
    if (spawn) {
      this.player = new Player(this, spawn.x || 0, spawn.y || 0, Assets.Characters.PlayerDress);
    } else {
      this.player = new Player(this, this.tilemap.widthInPixels / 2, this.tilemap.heightInPixels, Assets.Characters.PlayerDress);
    }
  }
  
  public update(time: number, delta: number): void {
    const keyPressed = {
      left: this.leftKey.isDown,
      right: this.rightKey.isDown,
      up: this.upKey.isDown,
      down: this.downKey.isDown,
    }    
  }
}
