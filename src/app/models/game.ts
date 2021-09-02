import 'phaser';
import { Preload } from '../scenes/preload';
import { HospitalScene } from '../scenes/hospital';
import { PlayerData } from './player-data';
import { CommunicationsService } from '../communications.service';
import { GymScene } from '../scenes/gym';
import { OverworldScene } from '../scenes/overworld';
import { HomeScene } from '../scenes/home';

export class CodeJamGame extends Phaser.Game {
  public paused = false;
  
  public teleportCooldown = -1;

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
        // arcade: {
        //   debug: true,
        // },
      },
      input: {
        keyboard: true,
      },
      disableContextMenu: true,
      scene: [Preload, HomeScene, HospitalScene, GymScene, OverworldScene],
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
