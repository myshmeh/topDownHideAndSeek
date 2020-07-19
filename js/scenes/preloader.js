class Preloader extends Phaser.Scene {
    constructor() {
        super({
            key: 'preloader',
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
        this.load.plugin('rexvirtualjoystickplugin', 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js', true);
        this.plugins.get('rexwebfontloaderplugin').addToScene(this);
        const fontLoadConfig = {
            google: {
                families: [FONTS.MONOTON, FONTS.CREEPSTER]
            }
        }
        this.load.rexWebFont(fontLoadConfig);
        this.load.atlas('sprites', 'img/spritearray.png', 'img/spritearray.json');
        this.load.image('asphalt', 'img/asphalt.png');
        this.load.image('key', 'img/key.png');
        this.load.image('powder', 'img/powder.png');
        this.load.image('powdered_slime', 'img/powdered_slime.png');
        this.load.image('slime', 'img/slime.png');
        this.load.image('floor', 'img/floor.png');
        this.load.image('home', 'img/home.png');
        this.load.image('goal', 'img/goal.png');
        this.load.image('obstacle', 'img/obstacle.png');
        this.load.spritesheet('player', 'img/MantisMove.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemy', 'img/MaggotWalk.png', { frameWidth: 64, frameHeight: 64 });
    }

    create() {
        this.anims.create({
            key: 'powdered_slime',
            frames: [{key: 'powdered_slime', frame: 0}],
        });

        // this.scene.start('menu');
        this.scene.start('stage6', {items: {key: 0, powder: 0}});
    }
}