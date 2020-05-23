class PrototypeStage extends Phaser.Scene {
    obstacles;
    player;
    cursors;
    isArrested;

    constructor() {
        super({
            key: 'prototypeStage'
        });
    }

    preload() {
        this.load.image('floor', 'img/floor.png');
        this.load.image('goal', 'img/goal.png');
        this.load.image('obstacle', 'img/obstacle.png');
        this.load.spritesheet('player', 'img/MantisMove.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('enemy', 'img/MaggotWalk.png', { frameWidth: 32, frameHeight: 32 });
    }

    create() {
        // platforms
        this.add.image(0, 0, 'floor').setOrigin(0);
        this.obstacles = this.physics.add.staticGroup();
        this.obstacles.create(320, 240, 'obstacle').setScale(2).refreshBody();
        // player
        this.player = this.physics.add.sprite(100, 100, 'player', 0);
        this.physics.add.collider(this.player, this.obstacles);
        this.anims.create({
            key: 'moveDown',
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moveRight',
            frames: this.anims.generateFrameNumbers('player', {start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moveLeft',
            frames: this.anims.generateFrameNumbers('player', {start: 8, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moveUp',
            frames: this.anims.generateFrameNumbers('player', {start: 12, end: 15}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'idle',
            frames: [{key: 'player', frame: 0}],
        });
        this.cursors = this.input.keyboard.createCursorKeys();

        // enemy
        this.enemy = this.physics.add.sprite(200, 200, 'enemy', 0);
        this.physics.add.collider(this.enemy, this.obstacles);
        // this.anims.create({
        //     key: 'moveEnemyDown',
        //     frames: this.anims.generateFrameNumbers('enemy', {start: 0, end: 3}),
        //     frameRate: 10,
        //     repeat: -1
        // });
        this.anims.create({
            key: 'moveEnemyRight',
            frames: this.anims.generateFrameNumbers('enemy', {start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'moveEnemyLeft',
            frames: this.anims.generateFrameNumbers('enemy', {start: 8, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        // this.anims.create({
        //     key: 'moveEnemyUp',
        //     frames: this.anims.generateFrameNumbers('enemy', {start: 12, end: 15}),
        //     frameRate: 10,
        //     repeat: -1
        // });
        this.anims.create({
            key: 'enemyIdle',
            frames: [{key: 'enemy', frame: 0}],
        });
        const arrestPlayer = (enemy, player) => {
            player.play('idle');
            player.disableBody(true);
            enemy.play('enemyIdle');
            enemy.disableBody(true);
            player.setTint(0xff0000);
            console.log('Player was Arrested!');
        };
        this.physics.add.overlap(this.enemy, this.player, arrestPlayer);
    }

    update() {
        // player operation
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
            this.player.play('idle', true);
        }
        else if (velX > 0) {
            this.player.play('moveRight', true);
        }
        else if (velX < 0) {
            this.player.play('moveLeft', true);
        }
        else if (velY > 0) {
            this.player.play('moveDown', true);
        }
        else if (velY < 0) {
            this.player.play('moveUp', true);
        }
        this.player.setVelocity(velX, velY);

        // enemy moving
        // get enemy corrdinate
        const enemyX = this.enemy.x;
        const enemyY = this.enemy.y;
        // get player corrdinate
        const playerX = this.player.x;
        const playerY = this.player.y;
        // vector from enemy to player
        const xVector = playerX - enemyX;
        const yVector = playerY - enemyY;
        const vector = Math.sqrt((xVector * xVector) + (yVector * yVector));
        // normarize vectors
        const xVectorNorm = xVector / vector;
        const yVectorNorm = yVector / vector;
        if (xVectorNorm < 0 && this.enemy.body.enable) {
            this.enemy.play('moveEnemyRight', true);
        } else if (this.enemy.body.enable) {
            this.enemy.play('moveEnemyLeft', true);
        }
        this.enemy.setVelocity(xVectorNorm * 50, yVectorNorm * 50); // coefficient determines speed

    }
}