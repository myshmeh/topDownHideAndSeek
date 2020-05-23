class Enemy extends Phaser.Physics.Arcade.Sprite {
    moveState;
    patrolStyle;
    patrolSpeed;
    scene;

    constructor(scene, x, y, texture, frame, patrolStyle) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.initAnims(scene);
        this.moveState = 'patrol';
        this.patrolStyle = patrolStyle;
        this.patrolSpeed = 25;
    }

    initAnims(scene) {
        scene.anims.create({
            key: 'moveEnemyRight',
            frames: scene.anims.generateFrameNumbers('enemy', {start: 4, end: 7}),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'moveEnemyLeft',
            frames: scene.anims.generateFrameNumbers('enemy', {start: 8, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'enemyIdle',
            frames: [{key: 'enemy', frame: 0}],
        });
    }

    patrol() {
        if (this.patrolStyle === 'horizontal') {
            this.setVelocityX(this.patrolSpeed);
            // TODO: fix collider
            this.scene.physics.add.collider(this, this.scene.obstacles, () => {
                console.log(this.patrolSpeed);
                this.patrolSpeed * -1;
                console.log(this.patrolSpeed);

            });

        } else if (this.patrolStyle === 'vertical') {

        }
    }

    chase(player) {
        // get enemy corrdinate
        const enemyX = this.x;
        const enemyY = this.y;
        // get player corrdinate
        const playerX = player.x;
        const playerY = player.y;
        // vector from enemy to player
        const xVector = playerX - enemyX;
        const yVector = playerY - enemyY;
        const vector = Math.sqrt((xVector * xVector) + (yVector * yVector));
        // normarize vectors
        const xVectorNorm = xVector / vector;
        const yVectorNorm = yVector / vector;
        const isEnabled = this.body.enable
        if (xVectorNorm < 0 && isEnabled) {
            this.play('moveEnemyRight', true);

        } else if (isEnabled) {
            this.play('moveEnemyLeft', true);
        }
        this.setVelocity(xVectorNorm * 50, yVectorNorm * 50); // coefficient determines speed
    }

    update(player) {
        if (this.moveState === 'patrol') this.patrol();
        else this.chase(player);
    }
}