import 'phaser';
import { Preload } from '../scenes/preload';
import { HospitalScene } from '../scenes/hospital';
import { PlayerData } from './player-data';
import { CommunicationsService } from '../communications.service';
import { GymScene } from '../scenes/gym';
import { OverworldScene } from '../scenes/overworld';
import { HomeScene } from '../scenes/home';
import { FactoryScene } from '../scenes/factory';

export class CodeJamGame extends Phaser.Game {
  public paused = false;

  public teleportCooldown = -1;
  public mushrooms = 0;
  public coils = 0;
  public explosives = 0;

  public needExplosives = false;
  public gotExplosives = false;

  constructor(public comms: CommunicationsService) {
    super({
      type: Phaser.AUTO,
      parent: 'game-container',
      width: document.body.offsetWidth,
      height: window.innerHeight,
      zoom: 1,
      pixelArt: true,
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      input: {
        keyboard: true,
      },
      disableContextMenu: true,
      scene: [Preload, HomeScene, HospitalScene, GymScene, OverworldScene, FactoryScene],
      plugins: {
        global: [
          {
            key: 'Player',
            plugin: PlayerData,
            start: false,
            mapping: 'player',
          },
        ],
      },
    });
  }
}
