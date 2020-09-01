class Ending3 extends Phaser.Scene {
    constructor () {
        super({
            key: 'ending3'
        });
    }

    init(data) {
        this.powderCount = data.powderCount;
    }

    create() {
        let endingPattern;
        if (!this.powderCount)
            endingPattern = 0;
        else if (this.powderCount >= 1 && this.powderCount < 5) {
            endingPattern = 1;
            this.add.image(WIDTH * 0.15, HEIGHT * 0.75, 'mom', 0).setScale(5).setAngle(75);
        }
        else
            endingPattern = 2;

        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, ENDING_PLOTS[2][endingPattern].toUpperCase(), {
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
        const roach = this.add.image(WIDTH * 0.15, HEIGHT * 0.75, 'roach_idle', 0).setScale(2).setAngle(75).setDepth(DEPTH_MID);
        [
            [WIDTH * 0.3125, HEIGHT * 0.7265],
            [WIDTH * 0.4, HEIGHT * 0.71],
            [WIDTH * 0.49, HEIGHT * 0.7265],
            [WIDTH * 0.55, HEIGHT * 0.78],
            [WIDTH * 0.6, HEIGHT * 0.7265],
        ].forEach((el, i) => {
            if (this.powderCount > 0 && i < this.powderCount) {
                this.add.image(el[0], el[1], 'powder_spread').setScale(1.5);
            }
            if (this.powderCount > 0 && i == this.powderCount - 1) {
                roach.x = el[0];
                roach.y = el[1];
            }
        });

        const rect = this.add.rectangle(0, 0, WIDTH, HEIGHT, 0, 1).setOrigin(0).setDepth(DEPTH_MAX);
        this.tweens.add({ targets: rect, duration: 500, alpha: 0 });

        this.input.on('pointerup', () => {
            this.tweens.add({ targets: rect, duration: 2000, alpha: 1, onComplete:  () => this.scene.start('ending4', { powderCount: this.powderCount })});
        });
    }

    update() {

    }
}