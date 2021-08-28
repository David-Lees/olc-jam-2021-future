export abstract class Character extends Phaser.Physics.Arcade.Sprite {
    constructor(scene: Phaser.Scene, x: number, y: number, sprite: string)    {
        super(scene,x,y,sprite, 0);
        this.scene = scene;
        this.scene.physics.add.existing(this);
        this.scene.add.existing(this);
    }    
}