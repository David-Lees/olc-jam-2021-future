import { CodeJamGame } from '../models/game';
import { Player } from '../models/player';
import { TilemapScene } from './tilemap-scene';
import { Conversations } from '../constants/conversations';

export class GymScene extends TilemapScene {
  constructor() {
    super('gym');
  }

  private exitZone?: Phaser.GameObjects.Zone;
  private welcomeZone?: Phaser.GameObjects.Zone;
  private welcomed = false;

  public create(data: any): void {
    super.create(data);

    const exit = this.tilemap?.findObject('Objects', x => x.name === 'Exit');
    if (exit && exit.x && exit.y && exit.width && exit.height) {
      this.exitZone = this.add.zone(exit.x, exit.y, exit.width, exit.height);
      this.exitZone.setOrigin(0,0);
      this.physics.add.existing(this.exitZone);
    }

    const welcomeObj = this.tilemap?.findObject('Objects', x => x.name === 'Welcome');
    if (welcomeObj && welcomeObj.x && welcomeObj.y && welcomeObj.width && welcomeObj.height) {
      console.log("Welcome", welcomeObj);
      this.welcomeZone = this.add.zone(welcomeObj.x, welcomeObj.y, welcomeObj.width, welcomeObj.height);
      this.welcomeZone.setOrigin(0,0);
      this.physics.add.existing(this.welcomeZone);
    }
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();

    this.checkTeleport(this.exitZone, 'overworld', 'GymExit');

    if (this.welcomeZone && !this.welcomed) {      
      this.physics.overlap(this.welcomeZone, this.player, () => {      
        this.welcomed = true;
        this.game.scene.pause(this);
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.WelcomeToGym,
            resume: 'gym',
          },
        });
      });
    }
  }
}
