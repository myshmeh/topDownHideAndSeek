// scene for ending
class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver'
        });
    }

    create() {
        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, 'CONGRATS!!', {
            fontFamily: FONTS.PRESS_START_2P,
            fontSize: '32px',
            color: '#fff',
            align: 'center'
        }).setOrigin(0.5, 0.5);
    }
}