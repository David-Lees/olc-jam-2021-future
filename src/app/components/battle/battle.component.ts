import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Attacks,
  Defences,
  DummyAttack,
  Wildcards,
} from 'src/app/constants/attacks';
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
  enemyName = 'They';

  card1?: BattleOption | null;
  card2?: BattleOption | null;
  card3?: BattleOption | null;
  card4?: BattleOption | null;

  card5?: BattleOption | null;
  card6?: BattleOption | null;
  card7?: BattleOption | null;
  card8?: BattleOption | null;

  messages: string[] = [];

  playerHealth = 100;
  playerStamina = 100;
  enemyHealth = 100;
  enemyStamina = 100;

  constructor() {}

  ngOnInit(): void {
    this.pickCards();
    setTimeout(() => {
      const objDiv = document.getElementById('nextBtn');
      objDiv?.scrollIntoView();
    }, 10);
  }

  pickCards() {
    const c1 = Math.floor(Math.random() * Attacks.length);
    let c2: number;
    do {
      c2 = Math.floor(Math.random() * Attacks.length);
    } while (Attacks[c1].name === Attacks[c2].name);

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

  enemyChoice(): BattleOption {
    const chance = Math.random();
    if (chance <= 0.3 && this.card5) return this.card5;
    if (chance <= 0.6 && this.card6) return this.card6;
    if (chance <= 0.85 && this.card7) return this.card7;
    return this.card8 || DummyAttack;
  }

  select(card: BattleOption) {
    let pick = true;
    const enemyCard = this.enemyChoice();
    console.log(card, enemyCard);

    // decide who managed to hit
    const playerHit = Math.random() <= card.hitChance;
    const enemyHit = Math.random() <= enemyCard.hitChance;

    // decide who goes first
    if (card.speed >= enemyCard!.speed) {
      this.doPlayerAttack(card, enemyCard!, playerHit, enemyHit);
      pick = pick && !this.checkIfWon();
      pick = pick && !this.checkIfLost();
      this.doEnemyAttack(card, enemyCard!, playerHit, enemyHit);
      pick = pick && !this.checkIfLost();
      pick = pick && !this.checkIfWon();
    } else {
      this.doEnemyAttack(card, enemyCard!, playerHit, enemyHit);
      pick = pick && !this.checkIfLost();
      pick = pick && !this.checkIfWon();
      this.doPlayerAttack(card, enemyCard!, playerHit, enemyHit);
      pick = pick && !this.checkIfWon();
      pick = pick && !this.checkIfLost();
    }

    // Stamina restore. 
    // Allow enemy to recover faster as they don't pay attention to stamina
    this.enemyStamina = this.restrain(this.enemyStamina + 5);
    this.playerStamina = this.restrain(this.playerStamina + 2.5);

    if (pick) {
      this.pickCards();
    } else {
      this.card1 = null;
      this.card2 = null;
      this.card3 = null;
      this.card4 = null;
      this.card5 = null;
      this.card6 = null;
      this.card7 = null;
      this.card8 = null;
    }
  }

  checkIfWon() {
    if (this.enemyHealth <= 0) {
      this.won.emit(true);
      return true;
    }
    return false;
  }

  checkIfLost() {
    if (this.playerHealth <= 0) {
      this.won.emit(false);
      return true;
    }
    return false;
  }

  doPlayerAttack(
    card: BattleOption,
    enemyCard: BattleOption,
    playerHit: boolean,
    enemyHit: boolean
  ) {
    if (this.playerStamina + card.stamina < 0) {
      this.messages.push(`You tried to ${card.name} but were too exhuasted`);
      return;
    }
    var damage = this.calcDamage(card, enemyCard, playerHit, enemyHit);

    console.log('player attack damage', damage);

    this.playerHealth += damage.attackerHealth;
    this.enemyHealth += damage.defenderHealth;
    this.playerStamina += damage.stamina;

    this.playerHealth = this.restrain(this.playerHealth);
    this.enemyHealth = this.restrain(this.enemyHealth);
    this.playerStamina = this.restrain(this.playerStamina);
    this.enemyStamina = this.restrain(this.enemyStamina);

    this.messages.push(
      `You tried to ${card.name} and ${playerHit ? 'suceeded' : 'failed'}`
    );
    if (damage.defenderHealth !== 0) {
      this.messages.push(
        `${this.enemyName} ${
          damage.defenderHealth > 0 ? 'gained' : 'lost'
        } ${Math.abs(damage.defenderHealth).toFixed(0)} health`
      );
    }
    if (damage.attackerHealth !== 0) {
      this.messages.push(
        `You ${damage.attackerHealth > 0 ? 'gained' : 'lost'} ${Math.abs(
          damage.attackerHealth
        ).toFixed(0)} health`
      );
    }
  }

  doEnemyAttack(
    card: BattleOption,
    enemyCard: BattleOption,
    playerHit: boolean,
    enemyHit: boolean
  ) {
    if (this.enemyStamina + enemyCard.stamina < 0) {
      this.messages.push(
        `${this.enemyName} tried to ${enemyCard.name} but were to exhuasted`
      );
      return;
    }
    var damage = this.calcDamage(enemyCard, card, enemyHit, playerHit);

    console.log('enemy attack damage', damage);

    this.playerHealth += damage.defenderHealth;
    this.enemyHealth += damage.attackerHealth;
    this.enemyStamina += damage.stamina;

    this.playerHealth = this.restrain(this.playerHealth);
    this.enemyHealth = this.restrain(this.enemyHealth);
    this.playerStamina = this.restrain(this.playerStamina);
    this.enemyStamina = this.restrain(this.enemyStamina);

    this.messages.push(
      `${this.enemyName} tried to ${enemyCard.name} and ${
        enemyHit ? 'suceeded' : 'failed'
      }`
    );
    if (damage.attackerHealth !== 0) {
      this.messages.push(
        `${this.enemyName} ${
          damage.attackerHealth > 0 ? 'gained' : 'lost'
        } ${Math.abs(damage.attackerHealth).toFixed(0)} health`
      );
    }
    if (damage.defenderHealth !== 0) {
      this.messages.push(
        `You ${damage.defenderHealth > 0 ? 'gained' : 'lost'} ${Math.abs(
          damage.defenderHealth
        ).toFixed(0)} health`
      );
    }
  }

  restrain(x: number) {
    if (x > 100) return 100;
    if (x < 0) return 0;
    return x;
  }

  calcDamage(
    attackerCard: BattleOption,
    defenderCard: BattleOption,
    attacked: boolean,
    defended: boolean
  ): BattleResult {
    let attackVariance = Math.random() * attackerCard.attackVariance;
    attackVariance = Math.random() >= 0.5 ? -attackVariance : attackVariance;
    const attack = attackerCard.attack + attackVariance;

    let defenceVariance = Math.random() * (defenderCard.defenceVariance / 100);
    defenceVariance = Math.random() >= 0.5 ? -defenceVariance : defenceVariance;
    const defence = defenderCard.defence / 100 + defenceVariance;

    let healthVariance = Math.random() * attackerCard.healthVariance;
    healthVariance = Math.random() >= 0.5 ? -healthVariance : healthVariance;
    const healthBoost = attackerCard.health + healthVariance;

    console.log('attack', attack);
    console.log('defence', defence);
    console.log('attacked', attacked);
    console.log('defended', defended);

    let attackerHealth = 0;
    let defenderHealth = 0;
    let stamina = 0;

    if (attacked) {
      // apply positive health/stamina effects
      attackerHealth += healthBoost;
      if (attackerCard.stamina > 0) stamina += attackerCard.stamina;

      // apply hp to opponent
      if (defended) {
        defenderHealth -= attack * (1 - defence);
      }
      else {
        defenderHealth -= attack;
      }
    }

    // always use stamina if negative
    if (attackerCard.stamina < 0) {
      stamina += attackerCard.stamina;
    }

    return {
      attackerHealth: attackerHealth,
      defenderHealth: defenderHealth,
      stamina: stamina,
    };
  }
}
