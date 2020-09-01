class Ending2 extends Phaser.Scene {
    constructor () {
        super({
            key: 'ending2'
        });
    }

    init(data) {
        this.powderCount = data.powderCount;
    }

    create() {
        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, ENDING_PLOTS[1].toUpperCase(), {
            fontFamily: FONTS.PRESS_START_2P,
            fontSize: '16px',
            color: '#fff',
            align: 'center',
            wordWrap: { width: WIDTH, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);

        this.add.image(WIDTH * 0.6, HEIGHT * 0.7, 'trap', 0).setScale(8);
        this.add.image(WIDTH * 0.3125, HEIGHT * 0.7265, 'target');
        this.add.image(WIDTH * 0.4, HEIGHT * 0.71, 'target');
        this.add.image(WIDTH * 0.49, HEIGHT * 0.7265, 'target');
        this.add.image(WIDTH * 0.55, HEIGHT * 0.78, 'target');
        this.add.image(WIDTH * 0.6, HEIGHT * 0.7265, 'target');
        this.add.image(WIDTH * 0.7, HEIGHT * 0.7, 'fiona_idle', 10).setScale(2).setAngle(0);
        this.add.image(WIDTH * 0.15, HEIGHT * 0.75, 'roach_idle', 0).setScale(2).setAngle(75);

        const rect = this.add.rectangle(0, 0, WIDTH, HEIGHT, 0, 1).setOrigin(0);
        this.tweens.add({ targets: rect, duration: 500, alpha: 0 });

        this.input.on('pointerup', () => {
            this.tweens.add({ targets: rect, duration: 500, alpha: 1, onComplete:  () => this.scene.start('ending3', { powderCount: this.powderCount })});
        });
    }

    update() {

    }
}