import { CodeJamGame } from '../models/game';
import { Player } from '../models/player';
import { TilemapScene } from './tilemap-scene';
import { Conversations } from '../constants/conversations';
import { Mother } from '../models/mother';
import { Assets } from '../constants/assets';

export class HomeScene extends TilemapScene {
  constructor() {
    super('home');
  }

  private exitZone?: Phaser.GameObjects.Zone;
  private downZone?: Phaser.GameObjects.Zone;
  private upZone?: Phaser.GameObjects.Zone;
  private upDeniedZone?: Phaser.GameObjects.Zone;
  private toiletZone?: Phaser.GameObjects.Zone;

  private allowDown = false;
  private allowExit = false;  
  private usedToilet = false;

  public create(data: any): void {
    super.create(data);

    (this.game as CodeJamGame).comms.of().forEach((message) => {
      console.log('recieved message on app-component', message);
      if (message.channel === 'chatend' && message.data.conversation === Conversations.HelloMum) {        
        this.motherChat = true;
        this.motherRight = true;
        this.mother?.play(`${Assets.Characters.Mother}-${Assets.Animations.Move.Right}`)
      }
    });

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

    this.checkTeleport(this.exitZone, 'overworld', 'HomeExit');

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
        const goto = this.tilemap?.findObject('Objects', x => x.name === 'DownSpawn');
        if (goto && goto.x && goto.y) this.player?.setPosition(goto.x, goto.y);
      });
    }

    if (this.upZone) {      
      this.physics.overlap(this.upZone, this.player, () => {              
        const goto = this.tilemap?.findObject('Objects', x => x.name === 'UpSpawn');
        if (goto && goto.x && goto.y) this.player?.setPosition(goto.x, goto.y);
      });
    }
    
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
      })
    }

    this.moveMum(delta / 20);

  }

  mother: Mother | undefined;
  motherRight = false;
  motherDown = false;
  motherChat = false;

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

    if (this.mother && this.motherDown && this.mother.y >= 575) {
      this.mother = undefined;
      this.motherDown = false;
    }
  }

  private spawnMum() {
    this.mother = new Mother(this, 464, 444, Assets.Characters.Mother); 
    this.mother.play(`${Assets.Characters.Mother}-${Assets.Animations.Idle.Down}`);
  }
}
