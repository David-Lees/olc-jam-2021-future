import { Assets } from '../constants/assets';
import { Orientation } from '../constants/orientation';
import { Character } from './character';

const PLAYER_SPEED = 80;

export class Player extends Character {
  constructor(scene: Phaser.Scene, x: number, y: number, sprite: string) {
    super(scene, x, y, sprite);

    scene.physics.add.existing(this);

    this.setCollideWorldBounds(true);
    this.setDepth(10);        
  }

  public isDressed = false;
  private orientation: Orientation = Orientation.Down;

  public updatePlayer(keyPressed: any) {
      if (!this.active) return;

      this.setVelocity(0);
      this.handleMovement(keyPressed);
  }

  private handleMovement(keyPressed: any) {
      let velocityX = 0;
      let velocityY = 0;
      if (keyPressed.left) velocityX -= PLAYER_SPEED;
      if (keyPressed.right) velocityX += PLAYER_SPEED;
      if (keyPressed.up) velocityY -= PLAYER_SPEED;
      if (keyPressed.down) velocityY += PLAYER_SPEED;

      if (velocityY < 0) {
          this.orientation = Orientation.Up;
      } else if (velocityY > 0) {
        this.orientation = Orientation.Down;
        }else if (velocityX < 0) {
          this.orientation = Orientation.Left;
      } else if (velocityX > 0) {
          this.orientation = Orientation.Right;
      }

      // Normalize movement speed
      const mag = velocityX*velocityX + velocityY*velocityY;
      if (mag > 0) {
        const ratio = PLAYER_SPEED*PLAYER_SPEED / mag;
        velocityX *= ratio;
        velocityY *= ratio;
      }
      
      this.setVelocityX(velocityX);
      this.setVelocityY(velocityY);      
      
      const character = this.isDressed ? Assets.Characters.PlayerDress : Assets.Characters.PlayerTrunks;
      const anim = velocityY + velocityX > 0 ? 'Move' : 'Idle';
      const key = `${character}-${Assets.Animations[anim][this.orientation]}`;
      console.log(key);
      this.play(key);
  }

}
