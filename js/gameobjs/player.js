class Player extends Phaser.Physics.Arcade.Sprite {
    cursors;
    items;

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add to scene
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.items = [];
        this.initAnims(scene);
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    getItems() {
        return this.items;
    }

    addItem(item) {
        this.items.push(item);
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
        let velX = 0;
        let velY = 0;
        const acc = 100;
        if (this.cursors.up.isDown) {
            velY -= acc;
        }
        if (this.cursors.down.isDown) {
            velY += acc;
        }
        if (this.cursors.right.isDown) {
            velX += acc;
        }
        if (this.cursors.left.isDown) {
            velX -= acc;
        }
        if (Math.abs(velX) && Math.abs(velY)) {
            velX /= Math.sqrt(2);
            velY /= Math.sqrt(2);
        }
        if (velX === 0 && velY === 0) {
            this.play('idle', true);
        }
        else if (velX > 0) {
            this.play('moveRight', true);
        }
        else if (velX < 0) {
            this.play('moveLeft', true);
        }
        else if (velY > 0) {
            this.play('moveDown', true);
        }
        else if (velY < 0) {
            this.play('moveUp', true);
        }
        this.setVelocity(velX, velY);
    }
}