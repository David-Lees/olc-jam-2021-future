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

  public enemyName: string | undefined;
  public avatar: string | undefined;

  public conversation: DialogTree = Conversations.Dummy;
  public resume: string = '';

  constructor(public comms: CommunicationsService) {
  }

  start() {
    this.game = new CodeJamGame(this.comms);
    
    this.comms.of().forEach((message) => {
      if (message.channel === 'chatstart') {
        this.conversation = message.data.conversation;
        this.resume = message.data.resume;
        this.chatMode = true;
      }
      if (message.channel === 'battlestart') {
        this.enemyName = message.data.enemyName;
        this.avatar = message.data.avatar;
        this.battleMode = true;
      }
    });
  }
}
