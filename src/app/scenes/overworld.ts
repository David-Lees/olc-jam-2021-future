import { Assets } from '../constants/assets';
import { Conversations } from '../constants/conversations';
import { Character } from '../models/character';
import { Mushroom } from '../models/mushroom';
import { Enemy } from '../models/enemy';
import { CodeJamGame } from '../models/game';
import { Info } from '../models/info';
import { Tank } from '../models/tank';
import { TilemapScene } from './tilemap-scene';
import { Tnt } from '../models/tnt';

export class OverworldScene extends TilemapScene {
  constructor() {
    super('overworld');
  }

  private hospital?: Phaser.GameObjects.Zone;
  private home?: Phaser.GameObjects.Zone;
  private factory?: Phaser.GameObjects.Zone;
  private gym?: Phaser.GameObjects.Zone;
  private tnt?: Info;

  private tank?: Character;
  private coils: (Character | undefined)[] = [];
  private mushrooms: (Character | undefined)[] = [];
  private enemies: Enemy[] | undefined = [];
  private monsterGroup!: Phaser.Physics.Arcade.Group;
  private terrorist?: Enemy;

  private spokenToTank = false;
  private tankIcon?: Info;
  private opponent: Enemy | undefined;

  public create(data: any): void {
    super.create(data);
    this.player?.setTexture(Assets.Characters.PlayerDress);
    const hospitalObj = this.tilemap?.findObject('Objects', x => x.name === 'Hospital');
    const gymObj = this.tilemap?.findObject('Objects', x => x.name === 'Gym');
    const homeObj = this.tilemap?.findObject('Objects', x => x.name === 'Home');
    const factoryObj = this.tilemap?.findObject('Objects', x => x.name === 'Factory');

    const tank = this.tilemap?.findObject('Objects', x => x.name === 'Tank');
    if (tank && tank.x && tank.y) {
      this.tank = new Tank(this, tank.x, tank.y, 'tank');
      this.tankIcon = new Info(this, tank.x + 32, tank.y - 16, 'info');
    }

    const tnt = this.tilemap?.findObject('Objects', x => x.name === 'TNT');
    if (tnt && tnt.x && tnt.y) {
      this.tnt = new Tnt(this, tnt.x, tnt.y, 'tnt');
    }

    const terror = this.tilemap?.findObject('Objects', x => x.name === 'Terrorist');
    if (terror && terror.x && terror.y) {
      this.terrorist = new Enemy(this, terror.x, terror.y, 'thug');
    }

    const c = this.tilemap?.filterObjects('Objects', x => x.name.startsWith('Coil'));
    this.coils =
      c?.map(cc => {
        return new Mushroom(this, cc.x || 0, cc.y || 0, 'coil');
      }) || [];

    const mms = this.tilemap?.filterObjects('Objects', x => x.name.startsWith('MM'));
    this.mushrooms =
      mms?.map(m => {
        return new Mushroom(this, m.x || 0, m.y || 0, 'mushroom');
      }) || [];

    const thugs = this.tilemap?.filterObjects('Objects', x => x.name.startsWith('Thug'));
    this.enemies =
      thugs?.map(t => {
        const thug = new Enemy(this, t.x || 0, t.y || 0, 'thug');
        thug.conversation = Conversations[t.name];
        return thug;
      }) || [];

    this.monsterGroup = this.physics.add.group(this.enemies.map(x => x));
    this.physics.add.collider(this.monsterGroup, this.collideLayer1);
    this.physics.add.collider(this.monsterGroup, this.collideLayer2);

    for (let i = 1; i <= 10; i++) {
      const obj = this.tilemap?.findObject('Objects', x => x.name === 'Thug' + i);
      if (obj && obj.x && obj.y) {
        this.enemies.push(new Enemy(this, obj.x, obj.y, 'thug'));
      }
    }

    if (hospitalObj && hospitalObj.x && hospitalObj.y && hospitalObj.width && hospitalObj.height) {
      this.hospital = this.add.zone(hospitalObj.x, hospitalObj.y, hospitalObj.width, hospitalObj.height);
      this.hospital.setOrigin(0, 0);
      this.physics.add.existing(this.hospital);
    }
    if (gymObj && gymObj.x && gymObj.y && gymObj.width && gymObj.height) {
      this.gym = this.add.zone(gymObj.x, gymObj.y, gymObj.width, gymObj.height);
      this.gym.setOrigin(0, 0);
      this.physics.add.existing(this.gym);
    }
    if (homeObj && homeObj.x && homeObj.y && homeObj.width && homeObj.height) {
      this.home = this.add.zone(homeObj.x, homeObj.y, homeObj.width, homeObj.height);
      this.home.setOrigin(0, 0);
      this.physics.add.existing(this.home);
    }
    if (factoryObj && factoryObj.x && factoryObj.y && factoryObj.width && factoryObj.height) {
      this.factory = this.add.zone(factoryObj.x, factoryObj.y, factoryObj.width, factoryObj.height);
      this.factory.setOrigin(0, 0);
      this.physics.add.existing(this.factory);
    }

    let comms = (this.game as CodeJamGame).comms;
    comms.of().forEach(message => {
      if (message.channel === 'battleend' && message.data.enemyName !== 'Ted') {
        if (!message.data.won) {
          let i = Math.random();
          let s: string;
          if (i < 0.25) {
            s = 'Spawn1';
          } else if (i < 0.5) {
            s = 'Spawn2';
          } else if (i < 0.75) {
            s = 'Spawn3';
          } else s = 'Spawn4';
          this.scene.switch('hospital');
          (this.game as CodeJamGame).comms.publish({
            channel: 'teleport',
            data: { scene: 'hospital', target: s },
          });
          this.sound.stopAll();
          this.sound.add('mood').play({ loop: true });
        } else if (message.channel === 'battleend' && message.data.enemyName === 'Terrorist') {
          this.terrorist?.destroy();
          this.terrorist = undefined;
          this.sound.stopAll();
          this.sound.add('march').play({ loop: true });
        } else {
          if (this.opponent) {
            const pos = this.enemies?.indexOf(this.opponent);
            if (pos && pos >= 0) this.enemies?.splice(pos, 1);
            this.opponent?.destroy();
            this.opponent = undefined;
            this.sound.stopAll();
            this.sound.add('march').play({ loop: true });
          }
        }
      }
    });
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();

    this.checkTeleport(this.hospital, 'hospital', 'Spawn');
    this.checkTeleport(this.gym, 'gym', 'Spawn');
    this.checkTeleport(this.home, 'home', 'Spawn');
    this.checkTeleport(this.factory, 'factory', 'Spawn');

    if (this.tnt) {
      this.physics.overlap(this.tnt, this.player, () => {
        (this.game as CodeJamGame).explosives++;
        this.tnt?.destroy();
        this.tnt = undefined;
      });
    }

    const needExplosives = (this.game as CodeJamGame).needExplosives;
    if (this.tank && needExplosives) {
      this.physics.overlap(this.tank, this.player, () => {
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.TankGirl1,
            resume: 'overworld',
          },
        });
        if (this.player) this.player.y += 100;
      });
    }

    if (
      (this.game as CodeJamGame).mushrooms >= 1 &&
      (this.game as CodeJamGame).coils >= 1 &&
      (this.game as CodeJamGame).explosives >= 1 &&
      this.tank
    ) {
      this.physics.overlap(this.tank, this.player, () => {
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.TankGirl2,
            resume: 'overworld',
          },
        });
        (this.game as CodeJamGame).gotExplosives = true;
        if (this.player) this.player.y += 100;
      });
    }

    this.coils.forEach(c => {
      if (c !== undefined) {
        this.physics.overlap(c, this.player, () => {
          c?.destroy();
          (this.game as CodeJamGame).coils++;
          c = undefined;
        });
      }
    });

    this.mushrooms.forEach(m => {
      if (m) {
        this.physics.overlap(m, this.player, () => {
          m?.destroy();
          m = undefined;
          (this.game as CodeJamGame).mushrooms++;
        });
      }
    });

    if (this.terrorist) {
      this.physics.overlap(this.terrorist, this.player, () => {
        (this.game as CodeJamGame).comms.publish({
          channel: 'chatstart',
          data: {
            conversation: Conversations.Terrorist1,
            resume: 'overworld',
          },
        });
      });
    }

    this.enemies?.forEach(x => {
      if (x) {
        x.updateMonster();
        this.physics.overlap(x, this.player, () => {
          if (x.conversation) {
            console.log(x);
            this.opponent = x;
            this.game.scene.pause(this);
            (this.game as CodeJamGame).comms.publish({
              channel: 'chatstart',
              data: {
                conversation: x.conversation,
                resume: 'overworld',
              },
            });
          }
        });
      }
    });
  }
}
