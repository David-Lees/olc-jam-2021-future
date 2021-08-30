import { Player } from '../models/player';
import { TilemapScene } from './tilemap-scene';

export class GymScene extends TilemapScene {
  constructor() {
    super('gym');
  }

  public create(data: any): void {
    super.create(data);
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();

    
  }
}
