import { Component } from '@angular/core';
import { CommunicationsService } from './communications.service';
import { Conversations, DialogTree } from './constants/conversations';
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

  public conversation: DialogTree = Conversations.Dummy;
  public resume: string = '';

  constructor(public comms: CommunicationsService) {
  }

  start() {
    this.game = new CodeJamGame(this.comms);
    //this.battleMode = true;

    this.comms.of().forEach((message) => {
      console.log('recieved message on app-component', message);
      if (message.channel === 'chatstart') {
        console.log('chat handler');
        this.conversation = message.data.conversation;
        this.resume = message.data.resume;
        this.chatMode = true;
      }
    });
  }
}
