class Opening2 extends Phaser.Scene {
    constructor () {
        super({
            key: 'opening2'
        });
    }

    create() {
        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, PLOTS[1], {
            fontFamily: FONTS.PRESS_START_2P,
            fontSize: '16px',
            color: '#fff',
            align: 'center',
            wordWrap: { width: WIDTH, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);

        this.add.image(WIDTH * 0.5, HEIGHT * 0.7, 'slime', 0).setScale(2);
        this.add.image(WIDTH * 0.5, HEIGHT * 0.7, 'fiona_animated_idle', 10).setScale(2).angle = 0;

        const rect = this.add.rectangle(0, 0, WIDTH, HEIGHT, 0, 1).setOrigin(0);
        this.tweens.add({ targets: rect, duration: 500, alpha: 0 });

        this.input.on('pointerup', () => {
            this.tweens.add({ targets: rect, duration: 500, alpha: 1, onComplete:  () => this.scene.start('opening3') });
        });
    }

    update() {

    }
}