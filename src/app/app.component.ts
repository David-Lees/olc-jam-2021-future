import { Component } from '@angular/core';
import { Game } from './models/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CodeJam2021';
  game: Game | undefined;

  start() {
    this.game = new Game();
  }
}
