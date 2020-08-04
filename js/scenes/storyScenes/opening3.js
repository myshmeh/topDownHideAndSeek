class Opening3 extends Phaser.Scene {
    constructor () {
        super({
            key: 'opening3'
        });
    }

    create() {
        const storyText = 'SAVE FIONA!!';
        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, storyText, {
            fontFamily: FONTS.PRESS_START_2P,
            fontSize: '26px',
            color: '#fff',
            align: 'center',
            wordWrap: { width: WIDTH, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);

        
        this.spotLight = this.add.circle(WIDTH * 0.5, HEIGHT * 0.6, 110, 0xffffcc, 0.35);
        this.roach = this.physics.add.sprite(WIDTH * 0.5, HEIGHT * 0.6, 'roach_idle', 0).setScale(2.5, 2.5);
        this.roach.play('roach_idle', true);

        // for fade-in, out
        const rect = this.add.rectangle(0, 0, WIDTH, HEIGHT, 0, 1).setOrigin(0);
        this.tweens.add({ targets: rect, duration: 1000, alpha: 0 });

        this.time.delayedCall(3000, () => { 
            this.roach.play('roach_move', true);
            this.roach.setVelocity(0, -400);
            this.tweens.add({ targets: rect, duration: 1500, alpha: 1, onComplete: () => {this.scene.start('stage1')} });
        }, [], this);
    }

    update() {
        this.spotLight.setPosition(this.roach.x, this.roach.y);
    }
}