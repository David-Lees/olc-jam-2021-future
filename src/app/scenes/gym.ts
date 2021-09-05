import { CodeJamGame } from '../models/game';
import { TilemapScene } from './tilemap-scene';
import { Conversations } from '../constants/conversations';
import { Assets } from '../constants/assets';
import { Ted } from '../models/ted';

export class GymScene extends TilemapScene {
  constructor() {
    super('gym');
  }

  private exitZone?: Phaser.GameObjects.Zone;
  private welcomeZone?: Phaser.GameObjects.Zone;
  private welcomed = false;
  private ted?: Ted;
  private startSpot?: Phaser.Types.Tilemaps.TiledObject;

  public create(data: any): void {
    super.create(data);
    this.player?.setTexture(Assets.Characters.PlayerDress);

    this.startSpot = this.tilemap?.findObject('Objects', x => x.name === 'Ted');

    this.exitZone = this.addZone('Exit');
    this.welcomeZone = this.addZone('Welcome');

    if (this.startSpot && this.startSpot.x && this.startSpot.y) {
      this.ted = new Ted(this, this.startSpot.x, this.startSpot.y, Assets.Characters.Ted);
    }

    let comms = (this.game as CodeJamGame).comms;
    comms.of().forEach(message => {
      if (message.channel === 'battleend' && message.data.enemyName === 'Ted') {
        this.ted?.setPosition(this.startSpot?.x, this.startSpot?.y);
        this.player?.setPosition(this.startSpot?.x, (this.startSpot?.y || 0) + 128);
      }
    });
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();

    this.physics.collide(this.collideLayer1, this.ted);
    this.physics.collide(this.collideLayer2, this.ted);

    this.ted?.wanderAround();

    this.checkTeleport(this.exitZone, 'overworld', 'GymExit');

    this.checkWelcomeOverlap();
    this.checkTedOverlap();
  }

  private checkTedOverlap() {
    if (this.ted && this.player) {
      this.physics.overlap(this.ted, this.player, () => {
        this.game.scene.pause(this);
        (this.game as CodeJamGame).comms.publish({
          channel: 'battlestart',
          data: {
            avatar: '/assets/avatars/ted/normal.png',
            enemyName: 'Ted',
            resume: 'gym',
          },
        });
      });
    }
  }

  private checkWelcomeOverlap() {
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
