import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BattleOption } from 'src/app/models/battle';

@Component({
  selector: 'app-battle-card',
  templateUrl: './battle-card.component.html',
  styleUrls: ['./battle-card.component.scss'],
})
export class BattleCardComponent implements OnInit {
  @Input() isPlayer!: boolean;
  @Input() card!: BattleOption;
  @Output() selected = new EventEmitter<BattleOption>();

  constructor() {}

  ngOnInit(): void {}

  select() {
    this.selected.emit(this.card);
  }
}
