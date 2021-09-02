import { CodeJamGame } from '../models/game';
import { Player } from '../models/player';
import { TilemapScene } from './tilemap-scene';
import { Conversations } from '../constants/conversations';

export class GymScene extends TilemapScene {
  constructor() {
    super('home');
  }

  private exitZone?: Phaser.GameObjects.Zone;
  private downZone?: Phaser.GameObjects.Zone;
  private upZone?: Phaser.GameObjects.Zone;
  private upDeniedZone?: Phaser.GameObjects.Zone;
  private toiletZone: Phaser.GameObjects.Zone;

  private allowDown = false;
  private allowExit = false;

  public create(data: any): void {
    super.create(data);

    const exit = this.tilemap?.findObject('Objects', x => x.name === 'Exit');
    if (exit && exit.x && exit.y && exit.width && exit.height) {
      this.exitZone = this.add.zone(exit.x, exit.y, exit.width, exit.height);
      this.physics.add.existing(this.exitZone);
    }

    const downObj = this.tilemap?.findObject('Objects', x => x.name === 'Down');
    if (downObj && downObj.x && downObj.y && downObj.width && downObj.height) {      
      this.downZone = this.add.zone(downObj.x, downObj.y, downObj.width, downObj.height);
      this.physics.add.existing(this.downZone);      
    }

    const upObj = this.tilemap?.findObject('Objects', x => x.name === 'Up');
    if (upObj && upObj.x && upObj.y && upObj.width && upObj.height) {      
      this.upZone = this.add.zone(upObj.x, upObj.y, upObj.width, upObj.height);
      this.physics.add.existing(this.upZone);      
    }

    const upDeniedObj = this.tilemap?.findObject('Objects', x => x.name === 'UpDenied');
    if (upDeniedObj && upDeniedObj.x && upDeniedObj.y && upDeniedObj.width && upDeniedObj.height) {      
      this.upDeniedZone = this.add.zone(upDeniedObj.x, upDeniedObj.y, upDeniedObj.width, upDeniedObj.height);
      this.physics.add.existing(this.upDeniedZone);      
    }

    const toiletObj = this.tilemap?.findObject('Objects', x => x.name === 'Toilet');
    if (toiletObj && toiletObj.x && toiletObj.y && toiletObj.width && toiletObj.height) {      
      this.toiletZone = this.add.zone(toiletObj.x, toiletObj.y, toiletObj.width, toiletObj.height);
      this.physics.add.existing(this.toiletZone);      
    }
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();

    this.checkTeleport(this.exitZone, 'overworld', 'GymExit');

    if (this.upDeniedZone && !this.allowDown) {      
      this.physics.overlap(this.upDeniedZone, this.player, () => {              
        this.game.scene.pause(this);
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.NoGoDown,
            resume: 'home',
          },
        });
        const goto = this.tilemap?.findObject('Objects', x => x.name === 'UpDeniedWalk');
        if (goto && goto.x && goto.y) this.player?.setPosition(goto.x, goto.y);
      });
    }

    if (this.downZone && this.allowDown) {      
      this.physics.overlap(this.downZone, this.player, () => {              
        this.game.scene.pause(this);
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.NoGoDown,
            resume: 'gym',
          },
        });
      });
    }
    
    if (this.downZone && this.allowDown) {      
      this.physics.overlap(this.downZone, this.player, () => {              
        this.game.scene.pause(this);
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.NoGoDown,
            resume: 'gym',
          },
        });
      });
    }
  }
}
