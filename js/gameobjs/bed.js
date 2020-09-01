class Bed extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y) {
        super(scene, x, y, 'bed');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.setScale(4).refreshBody();
        this.setAngle(90);
        this.body.setSize(30, 20);
    }
}