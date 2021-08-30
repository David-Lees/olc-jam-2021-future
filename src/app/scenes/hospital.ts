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
    const exit =  this.tilemap?.findObject('Objects', (x) => x.name === 'Exit');
    if (
      exit &&
      exit.x &&
      exit.y &&
      exit.width &&
      exit.height
    ) {
      console.log('exit of hospital', exit);
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
    if (this.exitZone) {
      this.physics.overlap(this.exitZone, this.player, () => {
        console.log('overlapped teleport trigger for exit hospital');

        let s = this.scene.get('overworld');
        if (s) {
          console.log('found scene', s);
          this.scene.switch(s);
        } else {
          console.log('scene not found, so starting', 'overworld');
          this.scene.launch('overworld');
          this.scene.switch('overworld');
        }

        this.scene.switch('overworld');
        (this.game as CodeJamGame).comms.publish({
          channel: 'Teleport',
          data: { scene: 'overworld', target: 'ExitHospital' },
        });
      });
    }
  }
}
