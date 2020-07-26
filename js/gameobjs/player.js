'use strict';
class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, items) {
        super(scene, x, y, 'roach_idle', 0);
        // add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.items = items;
        this.cursors = scene.input.keyboard.createCursorKeys();
        
        this.velX = 0;
        this.velY = 0;

        const joyStickRadius = 40;
        const config = {
            x: WIDTH * 0.5,
            y: HEIGHT * 0.9,
            radius: joyStickRadius,
            base: scene.add.circle(0, 0, joyStickRadius, 0xdddddd, 0.5),
            thumb: scene.add.circle(0, 0, joyStickRadius * 0.4, 0xffffff, 0.65),
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
            this.acc = PLAYER_ACC;
            const force = this.joyStick.force > joyStickRadius ? joyStickRadius : this.joyStick.force;
            this.accRate = force / joyStickRadius;
            this.velX = Math.cos(this.joyStick.angle * (Math.PI / 180)) * this.acc * this.accRate;
            this.velY = Math.sin(this.joyStick.angle * (Math.PI / 180)) * this.acc * this.accRate;
        });

        this.body.setSize(16, 16);
        this.setScale(1.2);
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

    update() {
        if (this.velX || this.velY) {
            this.play('roach_move', true);
            const offset = PLAYER_ANIM_MOVE_MS_PER_FRAME_MAX - PLAYER_ANIM_MOVE_MS_PER_FRAME_MIN;
            this.anims.msPerFrame = PLAYER_ANIM_MOVE_MS_PER_FRAME_MAX - offset * Math.sin(Math.PI/2 * this.accRate);
        }
        else this.play('roach_idle', true);
        if (this.pointed && this.joyStick.force) this.angle = this.joyStick.angle + 90;
        this.setVelocity(this.velX, this.velY);
    }
}