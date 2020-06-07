const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: '#000',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0
            , debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [ Preloader, Menu, Stage1, Stage2, GameOver ]
};

const game = new Phaser.Game(config);