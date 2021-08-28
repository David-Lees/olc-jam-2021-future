import { Orientation } from "../constants/orientation"

export class PlayerData extends Phaser.Plugins.BasePlugin {
  public orientation: Orientation = Orientation.Down;
  
  constructor(pluginManager: Phaser.Plugins.PluginManager) {
    super(pluginManager)
  }

}