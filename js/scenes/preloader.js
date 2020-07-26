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
        this.load.spritesheet('roach_idle', 'img/roach/roach_idle.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('roach_move', 'img/roach/roach_move.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('wood_floor', 'img/objects/wood_floor_isometric.png');
        this.load.image('stone_floor', 'img/objects/stone_floor.png');
        this.load.spritesheet('daddy_walk', 'img/humans/daddy_walk.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('daddy_run', 'img/humans/daddy_run.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('door', 'img/objects/door.png');
        this.load.image('door_light', 'img/objects/door_light.png');
        this.load.image('light_pole', 'img/objects/light_pole.png');
        this.load.image('light_pole_down', 'img/objects/light_pole_down.png');
        this.load.image('house', 'img/objects/house.png');
        this.load.spritesheet('flowers', 'img/objects/flowers.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('inventory_chunk', 'img/objects/inventory_chunk.png', {frameWidth: 32, frameHeight: 32});
    }

    create() {
        const roachIdleFrames = this.anims.generateFrameNumbers('roach_idle', {start: 0, end: 10});
        const roachMoveFrames = this.anims.generateFrameNumbers('roach_move');
        this.anims.create({
            key: 'roach_idle',
            frames: roachIdleFrames,
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'roach_move',
            frames: roachMoveFrames,
            frameRate: PLAYER_ANIM_MOVE_MS_PER_FRAME_MIN,
            repeat: -1
        });
        const daddyWalkFrames = this.anims.generateFrameNumbers('daddy_walk');
        const daddyRunFrames = this.anims.generateFrameNumbers('daddy_run');
        this.anims.create({
            key: 'daddy_walk',
            frames: daddyWalkFrames,
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'daddy_run',
            frames: daddyRunFrames,
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'powdered_slime',
            frames: [{key: 'powdered_slime', frame: 0}],
        });

        this.scene.start('stage1', {items: {key: 0, powder: 0}});
    }
}