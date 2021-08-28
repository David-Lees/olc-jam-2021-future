import 'phaser';
import { FirstLevel } from '../scenes/FirstLevel';
import { GameManager } from '../scenes/GameManager';
import { HUD } from '../scenes/HUD';
import { Preloader } from '../scenes/Preloader';
import { SecondLevel } from '../scenes/SecondLevel';

export class Game extends Phaser.Game {
  constructor() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width: 400,
      height: 250,
      zoom: 2.5,
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
      scene: [Preloader, FirstLevel, SecondLevel, GameManager, HUD],
    };
    super(config);
  }
}
