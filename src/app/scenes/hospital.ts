import { CodeJamGame } from '../models/game';
import { Player } from '../models/player';
import { TilemapScene } from './tilemap-scene';

export class HospitalScene extends TilemapScene {
  constructor() {
    super('hospital');
  }

  private exitZone?: Phaser.GameObjects.Zone;

  public create(data: any): void {
    super.create(data);
    const exit = this.tilemap?.findObject('Objects', x => x.name === 'Exit');
    if (exit && exit.x && exit.y && exit.width && exit.height) {
      this.exitZone = this.add.zone(exit.x, exit.y, exit.width, exit.height);
      this.exitZone.setOrigin(0, 0);
      this.physics.add.existing(this.exitZone);
    }
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();

    this.checkTeleport(this.exitZone, 'overworld', 'HospitalExit');
  }
}
