class Preloader extends Phaser.Scene {
    fontLoaded;
    constructor() {
        super({
            key: 'preloader',
            // reference: https://rexrainbow.github.io/phaser3-rex-notes/docs/site/webfontloader/
            pack: {
                files: [{
                    type: 'plugin',
                    key: 'rexwebfontloaderplugin',
                    url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexwebfontloaderplugin.min.js',
                    start: true
                }]
            }
        });
    }

    preload() {
        this.plugins.get('rexwebfontloaderplugin').addToScene(this);
        const fontLoadConfig = {
            google: {
                // for developing speed, avoid fetching press start 2p
                // families: [FONTS.MONOTON, FONTS.CREEPSTER, FONTS.PRESS_START_2P]
                families: [FONTS.MONOTON, FONTS.CREEPSTER]
            }
        }
        this.load.rexWebFont(fontLoadConfig);
        this.load.atlas('sprites', 'img/spritearray.png', 'img/spritearray.json');
        this.load.image('asphalt', 'img/asphalt.png');
        this.load.image('key', 'img/key.png');
        this.load.image('powder', 'img/powder.png');
        this.load.image('floor', 'img/floor.png');
        this.load.image('home', 'img/home.png');
        this.load.image('goal', 'img/goal.png');
        this.load.image('obstacle', 'img/obstacle.png');
        this.load.spritesheet('player', 'img/MantisMove.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemy', 'img/MaggotWalk.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // this.scene.start('menu');
        this.scene.start('stage1');
    }
}