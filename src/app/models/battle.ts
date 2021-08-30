export interface BattleOption {
  name: string;

  attack: number;
  attackVariance: number;

  defence: number;
  defenceVariance: number;
  
  speed: number;
  speedDescription: string;
  
  stamina: number;
  hitChance: number;

  health: number;
  healthVariance: number;
}

export interface BattleResult {
  attackerHealth: number;
  defenderHealth: number;
  stamina: number;
}