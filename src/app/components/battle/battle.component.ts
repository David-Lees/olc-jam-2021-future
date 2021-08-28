import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Attacks, Defences, Wildcards } from 'src/app/constants/attacks';
import { BattleOption, BattleResult } from 'src/app/models/battle';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss'],
})
export class BattleComponent implements OnInit {
  @Input() visible = false;
  @Output() won = new EventEmitter<boolean>();

  me = '/assets/avatars/player/dress/normal.png';
  them = '/assets/avatars/mother/angry.png';

  card1: BattleOption | undefined;
  card2: BattleOption | undefined;
  card3: BattleOption | undefined;
  card4: BattleOption | undefined;

  card5: BattleOption | undefined;
  card6: BattleOption | undefined;
  card7: BattleOption | undefined;
  card8: BattleOption | undefined;

  messages: string[] = [];

  playerHealth = 100;
  playerStamina = 100;
  enemyHealth = 100;
  enemyStamina = 100;

  constructor() {}

  ngOnInit(): void {
    this.pickCards();
  }

  pickCards() {
    const c1 = Math.floor(Math.random() * Attacks.length);
    let c2: number;
    do {
      c2 = Math.floor(Math.random() * Attacks.length);
    } while (c1 === c2);

    this.card1 = Attacks[c1];
    this.card2 = Attacks[c2];
    this.card3 = Defences[Math.floor(Math.random() * Defences.length)];
    this.card4 = Wildcards[Math.floor(Math.random() * Wildcards.length)];

    const c5 = Math.floor(Math.random() * Attacks.length);
    let c6: number;
    do {
      c6 = Math.floor(Math.random() * Attacks.length);
    } while (c5 === c6);

    this.card5 = Attacks[c5];
    this.card6 = Attacks[c6];
    this.card7 = Defences[Math.floor(Math.random() * Defences.length)];
    this.card8 = Wildcards[Math.floor(Math.random() * Wildcards.length)];
  }

  select(card: BattleOption) {
    const chance = Math.random();
    let enemyCard;
    if (chance <= 0.3) enemyCard = this.card5;
    else if (chance <= 0.6) enemyCard = this.card6;
    else if (chance <= 0.85) enemyCard = this.card7;
    else enemyCard = this.card8;

    // decide who goes first
    if (card.speed >= enemyCard!.speed) {
      this.doPlayerDamage(card, enemyCard!);
      this.checkIfWon();
      this.checkIfLost();
      this.doEnemyDamage(card, enemyCard!);
    } else {
      this.doEnemyDamage(card, enemyCard!);
      this.checkIfLost();
      this.checkIfWon();
      this.doPlayerDamage(card, enemyCard!);
    }

    this.pickCards();
  }

  checkIfWon() {
    if (this.enemyHealth <= 0) this.won.emit(true);    
  }

  checkIfLost() {
    if (this.playerHealth <= 0) this.won.emit(false);
  }

  doPlayerDamage(card: BattleOption, enemyCard: BattleOption) {
    var damage = this.calcDamage(card, enemyCard);
    this.playerHealth += damage.defenderHealth;
    this.enemyHealth += damage.attackerHealth;
    this.playerStamina += damage.stamina;
    this.messages.push(
      `You tried to "${card.name}" and ${damage.missed ? 'failed' : 'suceeded'}`
    );
  }

  doEnemyDamage(card: BattleOption, enemyCard: BattleOption) {
    var damage = this.calcDamage(enemyCard, card);
    this.playerHealth += damage.defenderHealth;
    this.enemyHealth += damage.attackerHealth;
    this.playerStamina += damage.stamina;
    this.messages.push(
      `They tried to "${card.name}" and ${damage.missed ? 'failed' : 'suceeded'}`
    );
  }

  calcDamage(card1: BattleOption, card2: BattleOption): BattleResult {
    const r1 = Math.random();
    const r2 = Math.random();
    const r3 = Math.random();
    const r4 = Math.random();
    const attack =
      card1.attack + r1 * card1.attackVariance * 2 - card1.attackVariance;
    const defence =
      card2.defence / 100 +
      r2 * card2.defenceVariance * 2 -
      card2.defenceVariance;
    const attacked = card1.hitChance <= r3;

    let attackerHealth = 0;
    let defenderHealth = 0;
    if (attacked) {
      attackerHealth +=
      card1.health +
      card1.healthVariance * Math.random() * 2 -
      card1.healthVariance;
      defenderHealth -= attack * defence;
    }
    
    let stamina = 0;
    if (card1.stamina > 0) {
      if (attacked) {
        stamina += card1.stamina;
      }
    } else {
      stamina += card1.stamina;
    }

    return {
      attackerHealth: attackerHealth,
      defenderHealth: defenderHealth,
      stamina: card1.stamina,
      missed: !attacked,
    };
  }
}
