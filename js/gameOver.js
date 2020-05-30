// scene for ending
class GameOver extends Phaser.Scene {
    constructor() {
        super({
            key: 'gameOver'
        });
    }

    create() {
        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, 'CONGRATS!!', {
            fontFamily: FONTS.CREEPSTER,
            fontSize: '64px',
            color: '#fff',
            align: 'center'
        }).setOrigin(0.5, 0.5);
    }
}