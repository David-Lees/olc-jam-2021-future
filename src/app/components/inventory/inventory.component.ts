import { Component, Input, OnInit } from '@angular/core';
import { CodeJamGame } from 'src/app/models/game';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  @Input() game: CodeJamGame | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}
