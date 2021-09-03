import { CodeJamGame } from '../models/game';
import { Player } from '../models/player';
import { TilemapScene } from './tilemap-scene';
import { Conversations } from '../constants/conversations';
import { Mother } from '../models/mother';
import { Assets } from '../constants/assets';
import { Character } from '../models/character';
import { Info } from '../models/info';

export class HomeScene extends TilemapScene {
  constructor() {
    super('home');
  }

  private exitZone?: Phaser.GameObjects.Zone;
  private downZone?: Phaser.GameObjects.Zone;
  private upZone?: Phaser.GameObjects.Zone;
  private upDeniedZone?: Phaser.GameObjects.Zone;
  private toiletZone?: Phaser.GameObjects.Zone;
  private phoneZone?: Phaser.GameObjects.Zone;

  private allowDown = false;
  private allowExit = false;  
  private usedToilet = false;

  public create(data: any): void {
    super.create(data);
    this.setUndressed();

    (this.game as CodeJamGame).comms.of().forEach((message) => {
      if (message.channel === 'chatend' && message.data.conversation === Conversations.HelloMum) {        
        if (this.player) {
          this.player.setTexture(Assets.Characters.PlayerDress);
          this.player.isDressed = true;
        }
        this.motherChat = true;
        this.motherRight = true;
        this.mother?.play(`${Assets.Characters.Mother}-${Assets.Animations.Move.Right}`)
      }
    });

    this.exitZone = this.addZone('Exit');
    this.downZone = this.addZone('Down');
    this.upZone = this.addZone('Up');
    this.upDeniedZone = this.addZone('UpDenied');
    this.toiletZone = this.addZone('Toilet');    
    this.phoneZone = this.addZone('Phone');

    this.spawnPhoneIcon();
  }  

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();
  
    if (this.allowExit) {
      this.checkTeleport(this.exitZone, 'overworld', 'HomeExit');
    } else {
      if (this.exitZone) {
        this.physics.overlap(this.exitZone, this.player, () => {          
        const goto = this.tilemap?.findObject('Objects', x => x.name === 'Spawn');
        if (goto && goto.x && goto.y) this.player?.setPosition(goto.x, goto.y - 16);
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.NoExitHome,
            resume: 'home',
          },
        });
        })
      }
    }

    this.checkCanGoDownstairsOverlap();
    this.checkDownOverlap();
    this.checkUpOverlap();
    this.checkToiletOverlap();
    this.checkMotherOverlap();
    this.checkPhoneOverlap();
    this.moveMum(delta / 20);
  }

  mother: Mother | undefined;
  motherRight = false;
  motherDown = false;
  motherChat = false;

  answeredPhone = false;
  private checkPhoneOverlap() {
    if (this.phoneZone && !this.answeredPhone) {
      this.physics.overlap(this.phoneZone, this.player, () => {
        this.phoneIcon?.destroy();
        this.answeredPhone = true;
        this.allowExit = true;
        this.game.scene.pause(this);
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.PhoneFromCeo,
            resume: 'home',
          },
        });
      });
    }
  }

  private checkCanGoDownstairsOverlap() {
    if (this.upDeniedZone && !this.allowDown && (this.game as CodeJamGame).teleportCooldown <= 0) {
      this.physics.overlap(this.upDeniedZone, this.player, () => {
        (this.game as CodeJamGame).teleportCooldown = 20;
        const goto = this.tilemap?.findObject('Objects', x => x.name === 'UpDeniedWalk');
        if (goto && goto.x && goto.y)
          this.player?.setPosition(goto.x, goto.y);
        this.game.scene.pause(this);
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.NoGoDown,
            resume: 'home',
          },
        });
      });
    }
  }

  private checkDownOverlap() {
    if (this.downZone && this.allowDown) {
      this.physics.overlap(this.downZone, this.player, () => {
        const goto = this.tilemap?.findObject('Objects', x => x.name === 'DownSpawn');
        if (goto && goto.x && goto.y)
          this.player?.setPosition(goto.x, goto.y);
      });
    }
  }

  private checkUpOverlap() {
    if (this.upZone) {
      this.physics.overlap(this.upZone, this.player, () => {
        const goto = this.tilemap?.findObject('Objects', x => x.name === 'UpSpawn');
        if (goto && goto.x && goto.y)
          this.player?.setPosition(goto.x, goto.y);
      });
    }
  }

  private checkMotherOverlap() {
    if (this.mother && !this.motherChat) {
      this.physics.overlap(this.mother, this.player, () => {
        this.game.scene.pause(this);
        this.motherChat = true;        
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.HelloMum,
            resume: 'home',
          },
        });
      });
    }
  }

  private checkToiletOverlap() {
    if (this.toiletZone && !this.usedToilet) {
      this.physics.overlap(this.toiletZone, this.player, () => {
        this.game.scene.pause(this);
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.Toilet,
            resume: 'home',
          },
        });
        this.allowDown = true;
        this.usedToilet = true;
        this.spawnMum();
      });
    }
  }

  private moveMum(delta: number) {
    if (this.mother && this.motherRight && this.mother.x < 560) {
      this.mother.x += delta;
    }

    if (this.mother && this.motherRight && this.mother.x >= 560) {
      this.motherDown = true;
      this.motherRight = false;
      this.mother?.play(`${Assets.Characters.Mother}-${Assets.Animations.Move.Down}`);
    }

    if (this.mother && this.motherDown && this.mother.y < 575) {
      this.mother.y += delta;
    }

    if (this.mother && this.motherDown && this.mother.y >= 570) {
      this.mother.destroy();
      this.mother = undefined;
      this.motherDown = false;
    }
  }

  private spawnMum() {
    this.mother = new Mother(this, 464, 414, Assets.Characters.Mother); 
    this.mother.play(`${Assets.Characters.Mother}-${Assets.Animations.Idle.Down}`);
  }

  private phoneIcon?: Character;
  private spawnPhoneIcon() {
    const pos = this.tilemap?.findObject('Objects', x => x.name === 'PhoneIcon');
    if (pos && pos.x && pos.y) {
      this.phoneIcon = new Info(this, pos.x, pos.y, 'info');
    }
  }
}
