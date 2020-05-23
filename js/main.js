const config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    backgroundColor: '#000',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: 0
            // , debug: true
        }
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [ PrototypeStage ]
};

const game = new Phaser.Game(config);