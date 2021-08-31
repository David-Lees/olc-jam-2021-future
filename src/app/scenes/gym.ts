import { Player } from '../models/player';
import { TilemapScene } from './tilemap-scene';

export class GymScene extends TilemapScene {
  constructor() {
    super('gym');
  }

  private exitZone?: Phaser.GameObjects.Zone;

  public create(data: any): void {
    super.create(data);

    const exit =  this.tilemap?.findObject('Objects', (x) => x.name === 'Exit');
    if (
      exit &&
      exit.x &&
      exit.y &&
      exit.width &&
      exit.height
    ) {
      this.exitZone = this.add.zone(
        exit.x,
        exit.y,
        exit.width,
        exit.height
      );
      this.physics.add.existing(this.exitZone);
    }
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();

    this.checkTeleport(this.exitZone, 'overworld', 'GymExit');
  }
}
