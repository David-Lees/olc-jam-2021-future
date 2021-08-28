import { Component, Input, OnInit } from '@angular/core';

export interface Question extends TextEntry {
  answers: TextEntry[];
}

export interface TextEntry {
  text: string;
  photo?: string;
  person?: string;
  me: boolean;
  label?: string;
  next?: string;
  take?: string;
  give?: string;
}

export interface DialogTree {
  lines: Array<Question | TextEntry>;
}

const photo = '/assets/face1.png';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @Input() visible = false;
  photo: string = photo;
  name: string = 'Obi-wan';
  nextLabel = 'Next';
  currentLine = 0;
  tree: DialogTree;
  lines: TextEntry[] = [];

  constructor() {
    this.tree = {
      lines: [
        { text: 'Hello world', me: true },
        { text: 'Hello there!', me: false, person: 'Obi-wan', photo: photo },
        { text: 'Nice to meet you', me: true },
        {
          text: 'Parrots are the best birds in the whole world',
          me: false,
          person: 'Obi-wan',
          photo: photo,
        },
        { text: "Oh no the're not!", me: true, label: 'not' },
        {
          text: 'Oh yes they are!',
          me: false,
          person: 'Obi-wan',
          photo: photo,
          next: 'not',
        },
      ],
    };
  }

  ngOnInit(): void {
    this.next();
  }

  next() {
    if (this.currentLine < this.tree.lines.length) {
      const entry = this.tree.lines[this.currentLine];
      if (entry.me) entry.person = 'Mark';
      console.log(entry);
      this.lines.push(entry);
      if (entry.person) this.name = entry.person;
      if (entry.photo) this.photo = entry.photo;
      if (entry.next) {
        this.currentLine = this.findWithAttr(
          this.tree.lines,
          'label',
          entry.next
        );
      } else {
        this.currentLine++;
      }
      setTimeout(() => {
        const objDiv = document.getElementById("nextBtn");
        objDiv?.scrollIntoView();
      }, 10);
    }
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
