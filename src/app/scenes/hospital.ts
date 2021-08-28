import { Player } from '../models/player';
import { TilemapScene } from './tilemap-scene';

export class HospitalScene extends TilemapScene {
  constructor() {
    super('hospital');
  }

  public create(data: any): void {
    super.create(data);
  }

  public update(time: number, delta: number): void {
    super.update(time, delta);
    super.player?.update();
  }
}
