class Ending4 extends Phaser.Scene {
    constructor () {
        super({
            key: 'ending4'
        });
    }

    init(data) {
        this.powderCount = data.powderCount;
    }

    create() {
        let endingPattern;
        if (!this.powderCount) {
            endingPattern = 0;
            this.add.image(WIDTH * 0.5, HEIGHT * 0.5, 'epilogue_one_grave', 0).setScale(5.1);
            this.physics.add.sprite(WIDTH * 0.475, HEIGHT * 0.825, 'roach_idle', 0).setScale(1.5).play('roach_idle');
        } else if (this.powderCount >= 1 && this.powderCount < 5) {
            endingPattern = 1;
            this.add.image(WIDTH * 0.5, HEIGHT * 0.5, 'epilogue_two_graves', 0).setScale(5.1);
        } else {
            endingPattern = 2;
            this.add.image(WIDTH * 0.5, HEIGHT * 0.5, 'epilogue_no_graves', 0).setScale(5.1);
            this.physics.add.sprite(WIDTH * 0.44, HEIGHT * 0.75, 'roach_idle', 0).setScale(1.5).play('roach_idle');
            this.physics.add.sprite(WIDTH * 0.56, HEIGHT * 0.75, 'fiona_idle', 0).setScale(1.5).play('fiona_idle');
        }

        this.add.text(WIDTH * 0.5, HEIGHT * 0.45, ENDING_PLOTS[3][endingPattern].toUpperCase(), {
            fontFamily: FONTS.PRESS_START_2P,
            fontSize: '28px',
            color: '#fff',
            align: 'center',
            wordWrap: { width: WIDTH, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);

        this.add.text(WIDTH * 0.65, HEIGHT * 0.97, 'THANKS FOR PLAYING!'.toUpperCase(), {
            fontFamily: FONTS.PRESS_START_2P,
            fontSize: '13px',
            color: '#fff',
            align: 'right',
            backgroundColor: '#8dc93c',
            padding: {
                x: 10,
                y: 5
            },
            wordWrap: { width: WIDTH, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);

        const rect = this.add.rectangle(0, 0, WIDTH, HEIGHT, 0, 1).setOrigin(0);
        this.tweens.add({ targets: rect, duration: 1500, alpha: 0 });
    }

    update() {

    }
}