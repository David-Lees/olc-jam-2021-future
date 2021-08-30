import { Component } from '@angular/core';
import { CommunicationsService } from './communications.service';
import { CodeJamGame } from './models/game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'CodeJam2021';
  game: CodeJamGame | undefined;
  battleMode = false;
  chatMode = false;

  constructor(public comms: CommunicationsService) {
  }

  start() {
    this.game = new CodeJamGame(this.comms);
    //this.battleMode = true;
  }
}
