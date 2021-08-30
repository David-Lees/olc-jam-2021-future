import 'phaser';
import { Preload } from '../scenes/preload';
import { HospitalScene } from '../scenes/hospital';
import { PlayerData } from './player-data';

export class Game extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
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
      scene: [Preload, HospitalScene],
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
    };
    super(config);
  }
}
