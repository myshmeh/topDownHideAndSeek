'use strict';
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, items) {
        super(scene, x, y, texture, frame);
        // add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.items = items;
        this.initAnims(scene);
        this.cursors = scene.input.keyboard.createCursorKeys();
        
        this.velX = 0;
        this.velY = 0;

        const joyStickRadius = 40;
        const config = {
            x: WIDTH * 0.5,
            y: HEIGHT * 0.9,
            radius: joyStickRadius,
            base: scene.add.circle(0, 0, joyStickRadius, 0x888888),
            thumb: scene.add.circle(0, 0, joyStickRadius * 0.5, 0xcccccc),
            forceMin: 0,
        };
        this.joyStick = scene.plugins.get('rexvirtualjoystickplugin').add(scene, config);
        this.joyStick.setVisible(false);
        scene.input.on('pointerdown', (pointer) => {
            this.pointed = true;
            this.joyStick.setPosition(pointer.downX, pointer.downY);
            this.joyStick.setVisible(true);
        });
        scene.input.on('pointerup', () => {
            this.joyStick.setVisible(false);
            this.pointed = false;
            this.velX = 0;
            this.velY = 0;
        });
        scene.input.on('pointermove', (pointer) => {
            if (!this.pointed) return;
            const acc = 100;
            const force = this.joyStick.force > joyStickRadius ? joyStickRadius : this.joyStick.force;
            this.velX = Math.cos(this.joyStick.angle * (Math.PI / 180)) * acc * (force / joyStickRadius);
            this.velY = Math.sin(this.joyStick.angle * (Math.PI / 180)) * acc * (force / joyStickRadius);
            // console.log(parseInt(force), parseInt(this.joyStick.force), parseInt(this.velX), parseInt(this.velY));
        });
    }

    getItems() {
        return this.items;
    }

    addItem(item) {
        this.items[item.name] += 1;
    }

    usePowder() {
        this.items.powder -= 1;
    }

    initAnims(scene) {
        scene.anims.create({
            key: 'moveDown',
            frames: scene.anims.generateFrameNumbers('player', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'moveRight',
            frames: scene.anims.generateFrameNumbers('player', {start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'moveLeft',
            frames: scene.anims.generateFrameNumbers('player', {start: 8, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'moveUp',
            frames: scene.anims.generateFrameNumbers('player', {start: 12, end: 15}),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 0}],
        });
    }

    update() {
        this.setVelocity(this.velX, this.velY);
    }
}