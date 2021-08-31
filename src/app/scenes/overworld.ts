import { CodeJamGame } from '../models/game';
import { Player } from '../models/player';
import { TilemapScene } from './tilemap-scene';

export class OverworldScene extends TilemapScene {
  constructor() {
    super('overworld');
  }

  private hospital?: Phaser.GameObjects.Zone;
  private home?: Phaser.GameObjects.Zone;
  private factory?: Phaser.GameObjects.Zone;
  private gym?: Phaser.GameObjects.Zone;

  public create(data: any): void {
    super.create(data);

    const hospitalObj = this.tilemap?.findObject(
      'Objects',
      (x) => x.name === 'Hospital'
    );
    const gymObj = this.tilemap?.findObject('Objects', (x) => x.name === 'Gym');
    const homeObj = this.tilemap?.findObject(
      'Objects',
      (x) => x.name === 'Home'
    );
    const factoryObj = this.tilemap?.findObject(
      'Objects',
      (x) => x.name === 'Factory'
    );

    if (
      hospitalObj &&
      hospitalObj.x &&
      hospitalObj.y &&
      hospitalObj.width &&
      hospitalObj.height
    ) {
      this.hospital = this.add.zone(
        hospitalObj.x,
        hospitalObj.y,
        hospitalObj.width,
        hospitalObj.height
      );
      this.physics.add.existing(this.hospital);
    }
    if (gymObj && gymObj.x && gymObj.y && gymObj.width && gymObj.height) {
      this.gym = this.add.zone(gymObj.x, gymObj.y, gymObj.width, gymObj.height);
      this.physics.add.existing(this.gym);
    }
    if (homeObj && homeObj.x && homeObj.y && homeObj.width && homeObj.height) {
      this.home = this.add.zone(
        homeObj.x,
        homeObj.y,
        homeObj.width,
        homeObj.height
      );
      this.physics.add.existing(this.home);
    }
    if (
      factoryObj &&
      factoryObj.x &&
      factoryObj.y &&
      factoryObj.width &&
      factoryObj.height
    ) {
      this.factory = this.add.zone(
        factoryObj.x,
        factoryObj.y,
        factoryObj.width,
        factoryObj.height
      );
      this.physics.add.existing(this.factory);
    }
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();
        
    this.checkTeleport(this.hospital, 'hospital', 'Spawn');
    this.checkTeleport(this.gym, 'gym', 'Spawn');
  }
}
