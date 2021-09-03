import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { CommunicationsService } from 'src/app/communications.service';
import { Conversations, DialogTree, TextEntry } from 'src/app/constants/conversations';
import { CodeJamGame } from 'src/app/models/game';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input() tree: DialogTree = { lines: [] };
  @Input() game: CodeJamGame | undefined;
  @Input() parent: AppComponent | undefined;
  @Input() resume: string | undefined;
  photoLeft: string = '';
  photoRight: string = '';
  name: string = '';
  nextLabel = 'Next';
  nextEnabled = true;
  currentLine = 0;

  lines: TextEntry[] = [];

  private scroller: any;

  constructor(private comms: CommunicationsService) {}

  ngOnInit(): void {
    this.next();
    this.scroller = setInterval(() => {
      const objDiv = document.getElementById('nextBtn');
      objDiv?.scrollIntoView();
    }, 10);
  }

  ngOnDestroy() {
    if (this.scroller) {
      clearInterval(this.scroller);
    }
  }

  next() {
    if (this.currentLine < this.tree.lines.length && this.nextEnabled) {
      const entry = this.tree.lines[this.currentLine];
      if (entry.me) entry.person = 'Marcus';      
      this.lines.push(entry);

      this.nextEnabled = false;
      for (let i = 0; i <= entry.text.length; i++) {
        setTimeout(() => {
          entry.outputText = entry.text.substr(0, i);
          if (entry.outputText === entry.text) this.nextEnabled = true;
        }, i * 40);
      }

      this.name = entry.person || '';
      this.photoLeft = entry.photoLeft || '';
      this.photoRight = entry.photoRight || '';
      if (entry.next) {
        this.currentLine = this.findWithAttr(this.tree.lines, 'label', entry.next);
      } else {
        this.currentLine++;
      }
    }
    if (this.currentLine >= this.tree.lines.length) {
      this.nextEnabled = false;
    }
  }

  close() {
    if (this.parent) {
      this.parent.chatMode = false;
    }
    this.game?.scene.resume(this.resume || '');
    this.comms.publish({
      channel: 'chatend',
      data: {
        conversation: this.tree,
      },
    });
  }

  findWithAttr(array: Array<any>, attr: string, value: string) {
    for (var i = 0; i < array.length; i += 1) {
      if (array[i][attr] === value) {
        return i;
      }
    }
    return 0;
  }
}
