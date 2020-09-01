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
                families: [FONTS.PRESS_START_2P.split('"')[1]]
            }
        }
        this.load.rexWebFont(fontLoadConfig);
        this.load.image('obstacle', 'img/objects/obstacle.png');
        // --------------------------followings are improved OEKAKI-------------------------------
        this.load.image('powder', 'img/objects/powder.png');
        this.load.image('powder_spread', 'img/objects/powder_spread.png');
        this.load.image('trap', 'img/objects/trap2.png');
        this.load.image('trap_powdered', 'img/objects/trap_powdered.png');
        this.load.image('asphalt', 'img/objects/asphalt.png');
        this.load.image('key', 'img/objects/key.png');
        this.load.spritesheet('roach_idle', 'img/roach/roach_idle.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('roach_move', 'img/roach/roach_move.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('roach_dead', 'img/roach/roach_dead.png');
        this.load.spritesheet('fiona_idle', 'img/roach/fiona_idle.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('wood_floor', 'img/objects/wood_floor_isometric.png');
        this.load.image('stone_floor', 'img/objects/stone_floor.png');
        this.load.image('tatami_floor', 'img/objects/tatami.png');
        this.load.image('door', 'img/objects/door.png');
        this.load.image('light_pole', 'img/objects/light_pole.png');
        this.load.image('light_pole_down', 'img/objects/light_pole_down.png');
        this.load.image('house', 'img/objects/house2.png');
        this.load.spritesheet('flowers', 'img/objects/flowers.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('inventory_chunk', 'img/objects/inventory_chunk.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('map', 'img/sceneries/map.png');
        this.load.image('epilogue_no_graves', 'img/sceneries/epilogue_no_graves.png');
        this.load.image('epilogue_one_grave', 'img/sceneries/epilogue_one_grave.png');
        this.load.image('epilogue_two_graves', 'img/sceneries/epilogue_two_graves.png');
        this.load.image('bed', 'img/objects/bed.png');
        this.load.image('tv', 'img/objects/tv.png');
        this.load.spritesheet('tv_anim', 'img/objects/tv_anim.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('shelf', 'img/objects/shelf.png');
        this.load.image('shelf_w_flower', 'img/objects/shelf_w_flower.png');
        this.load.image('table', 'img/objects/table.png');
        this.load.image('carpet', 'img/objects/carpet.png');
        this.load.image('carpet2', 'img/objects/carpet2.png');
        this.load.spritesheet('desks', 'img/objects/desks.png', {frameWidth: 48, frameHeight: 32});
        this.load.spritesheet('kitchen', 'img/objects/kitchen.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('fridge', 'img/objects/fridge.png');
        this.load.spritesheet('trash_bins', 'img/objects/trash_bins.png', {frameWidth: 32, frameHeight: 32});
        this.load.image('target', 'img/objects/target.png');

        this.load.spritesheet('daddy', 'img/humans/daddy/daddy_walk.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('daddy_run', 'img/humans/daddy/daddy_run.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('man', 'img/humans/daddy/daddy_walk.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('mom', 'img/humans/mom/mom_idle.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('mom_run', 'img/humans/mom/mom_run.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('son', 'img/humans/son/son_walk.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('son_run', 'img/humans/son/son_run.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('son2', 'img/humans/son2/son2_walk.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('son2_run', 'img/humans/son2/son2_run.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('son3', 'img/humans/son2/son2_walk.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('daughter', 'img/humans/daughter/daughter_walk.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('daughter_run', 'img/humans/daughter/daughter_run.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('grandpa', 'img/humans/grandpa/grandpa_walk.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('grandma', 'img/humans/grandma/grandma_walk.png', {frameWidth: 32, frameHeight: 32});
        this.load.spritesheet('grandma2', 'img/humans/grandma/grandma_walk.png', {frameWidth: 32, frameHeight: 32});
    }

    create() {
        const roachIdleFrames = this.anims.generateFrameNumbers('roach_idle', {start: 0, end: 10});
        const roachMoveFrames = this.anims.generateFrameNumbers('roach_move');
        const fionaIdleFrames = this.anims.generateFrameNumbers('fiona_idle', {start: 0, end: 10});
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
        this.anims.create({
            key: 'fiona_idle',
            frames: fionaIdleFrames,
            frameRate: 8,
            repeat: -1,
        });
        const daddyWalkFrames = this.anims.generateFrameNumbers('daddy');
        const daddyRunFrames = this.anims.generateFrameNumbers('daddy_run');
        const sonWalkFrames = this.anims.generateFrameNumbers('son');
        const sonRunFrames = this.anims.generateFrameNumbers('son_run');
        this.anims.create({
            key: 'daddy_patrol',
            frames: daddyWalkFrames,
            frameRate: 0,
            repeat: -1
        });
        this.anims.create({
            key: 'daddy_chase',
            frames: daddyRunFrames,
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'man_patrol',
            frames: daddyWalkFrames,
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'man_chase',
            frames: daddyRunFrames,
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'mom_patrol',
            frames: this.anims.generateFrameNumbers('mom'),
            frameRate: 0,
            repeat: 0,
        });
        this.anims.create({
            key: 'mom_chase',
            frames: this.anims.generateFrameNumbers('mom_run'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'son_patrol',
            frames: sonWalkFrames,
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'son_chase',
            frames: sonRunFrames,
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'son2_patrol',
            frames: this.anims.generateFrameNumbers('son2'),
            frameRate: 0,
            repeat: -1,
        });
        this.anims.create({
            key: 'son2_chase',
            frames: this.anims.generateFrameNumbers('son2_run'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'son3_patrol',
            frames: this.anims.generateFrameNumbers('son2'),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'son3_chase',
            frames: this.anims.generateFrameNumbers('son2_run'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'daughter_patrol',
            frames: this.anims.generateFrameNumbers('daughter'),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'daughter_chase',
            frames: this.anims.generateFrameNumbers('daughter_run'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'grandpa_patrol',
            frames: this.anims.generateFrameNumbers('grandpa'),
            frameRate: 0,
            repeat: 0,
        });
        this.anims.create({
            key: 'grandpa_chase',
            frames: this.anims.generateFrameNumbers('grandpa'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'grandma_patrol',
            frames: this.anims.generateFrameNumbers('grandma'),
            frameRate: 0,
            repeat: 0,
        });
        this.anims.create({
            key: 'grandma_chase',
            frames: this.anims.generateFrameNumbers('grandma'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'grandma2_patrol',
            frames: this.anims.generateFrameNumbers('grandma'),
            frameRate: 8,
            repeat: -1,
        });
        this.anims.create({
            key: 'grandma2_chase',
            frames: this.anims.generateFrameNumbers('grandma'),
            frameRate: 12,
            repeat: -1
        });
        this.anims.create({
            key: 'tv_idle',
            frames: this.anims.generateFrameNumbers('tv_anim'),
            frameRate: 12,
            repeat: -1,
        });
        this.anims.create({
            key: 'trap_powdered',
            frames: [{
                key: 'trap_powdered',
                frame: 0,
            }],
            frameRate: 0,
            repeat: 0,
        });

        this.scene.start('opening1', {items: {key: 0, powder: 5}});
    }
}