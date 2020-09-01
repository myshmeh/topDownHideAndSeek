class Opening1 extends Phaser.Scene {
    constructor () {
        super({
            key: 'opening1'
        });
    }

    create() {
        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, PLOTS[0].toUpperCase(), {
            fontFamily: FONTS.PRESS_START_2P,
            fontSize: '16px',
            color: '#fff',
            align: 'center',
            wordWrap: { width: WIDTH, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);

        this.add.image(WIDTH * 0.3, HEIGHT * 0.7, 'fiona_idle', 0).setScale(2).angle = 0;
        this.add.image(WIDTH * 0.7, HEIGHT * 0.7, 'trap', 0).setScale(4);
        this.add.image(WIDTH * 0.7, HEIGHT * 0.7, 'powder', 0).setTintFill(0xeded00);

        const rect = this.add.rectangle(0, 0, WIDTH, HEIGHT, 0, 1).setOrigin(0);
        this.tweens.add({ targets: rect, duration: 500, alpha: 0 });

        this.input.on('pointerup', () => {
            this.tweens.add({ targets: rect, duration: 500, alpha: 1, onComplete:  () => this.scene.start('opening2') });
        });
    }
}