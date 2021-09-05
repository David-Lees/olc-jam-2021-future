import { CodeJamGame } from '../models/game';
import { Player } from '../models/player';
import { TilemapScene } from './tilemap-scene';
import { Conversations } from '../constants/conversations';
import { Mother } from '../models/mother';
import { Assets } from '../constants/assets';
import { Character } from '../models/character';
import { Info } from '../models/info';

export class FactoryScene extends TilemapScene {
  constructor() {
    super('factory');
  }

  private geraldineZone?: Phaser.GameObjects.Zone;
  private baileyZone?: Phaser.GameObjects.Zone;
  private exitZone?: Phaser.GameObjects.Zone;

  private canEnter = false;
  private gotMission = false;
  private blownSafe = false;

  public create(data: any): void {
    super.create(data);

    (this.game as CodeJamGame).comms.of().forEach(message => {
      if (message.channel === 'chatend' && message.data.conversation === Conversations.FutureWelcome) {
        this.canEnter = true;
      }

      if (message.channel === 'chatend' && message.data.conversation === Conversations.Vault1) {
        this.gotMission = true;
        (this.game as CodeJamGame).needExplosives = true;
      }

      if (message.channel === 'chatend' && message.data.conversation === Conversations.Vault2) {
        this.blownSafe = true;
      }
    });

    this.exitZone = this.addZone('Exit');
    this.baileyZone = this.addZone('Bailey');
    this.geraldineZone = this.addZone('Geraldine');
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();

    this.checkTeleport(this.exitZone, 'overworld', 'FactoryExit');

    if (this.baileyZone && !this.canEnter) {
      this.physics.overlap(this.baileyZone, this.player, () => {
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.FutureWelcome,
            resume: 'factory',
          },
        });
      });
    }

    if (this.geraldineZone && !this.gotMission) {
      this.physics.overlap(this.geraldineZone, this.player, () => {
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.Vault1,
            resume: 'factory',
          },
        });
      });
    }

    const gotExplosives = (this.game as CodeJamGame).gotExplosives;

    if (this.geraldineZone && gotExplosives && !this.blownSafe) {
      this.physics.overlap(this.geraldineZone, this.player, () => {
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.Vault2,
            resume: 'factory',
          },
        });
      });
    }
  }
}
