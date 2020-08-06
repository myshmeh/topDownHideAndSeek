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
            this.add.image(WIDTH * 0.5, HEIGHT * 0.7, 'slime', 0).setScale(2);
            this.add.image(WIDTH * 0.5, HEIGHT * 0.7, 'fiona_animated_idle', 10).setScale(2).angle = 0;    
        } else if (this.powderCount >= 1 && this.powderCount < 5) {
            endingPattern = 1;
            this.add.image(WIDTH * 0.5, HEIGHT * 0.7, 'slime', 0).setScale(2);
            this.add.image(WIDTH * 0.5, HEIGHT * 0.7, 'fiona_animated_idle', 10).setScale(2).angle = 0;
        } else {
            endingPattern = 2;
            this.add.image(WIDTH * 0.5, HEIGHT * 0.7, 'slime', 0).setScale(2);
            this.add.image(WIDTH * 0.5, HEIGHT * 0.7, 'fiona_animated_idle', 10).setScale(2).angle = 0;
        }

        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, ENDING_PLOTS[3][endingPattern], {
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
    }

    update() {

    }
}