class Enemy extends Phaser.Physics.Arcade.Sprite {
    moveState;
    patrolStyle;
    patrolSpeed;
    scene;
    sightTriangle;

    constructor(scene, x, y, texture, frame, patrolStyle) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.initAnims(scene);

        this.moveState = 'patrol';
        this.patrolStyle = patrolStyle;
        this.patrolSpeed = 25;

        this.sightTriangle = this.createTriangle(x, y, 80, 40);
        this.scene.graphics.lineStyle(2, 0xff0000);
        this.scene.graphics.strokeTriangleShape(this.sightTriangle);
    }

    createTriangle(vertexX, vertexY, sightDistance, sightRange) {
        const point1X = vertexX + sightDistance; 
        const point1Y = vertexY + sightRange;
        const point2X = vertexX + sightDistance;
        const point2Y = vertexY - sightRange;
        return new Phaser.Geom.Triangle(vertexX, vertexY, point1X, point1Y, point2X, point2Y);
    }

    createCollisionMove() {
        this.scene.physics.add.collider(this, this.scene.obstacles, () => {
            this.patrolSpeed *= -1;
            Phaser.Geom.Triangle.RotateAroundXY(this.sightTriangle, this.x, this.y, Math.PI);
        });
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

    updateSight() {
        // if 'patrol', re-draw triangle
        this.sightTriangle.x2 += this.x - this.sightTriangle.x1;
        this.sightTriangle.x3 += this.x - this.sightTriangle.x1;
        this.sightTriangle.x1 = this.x;
        this.sightTriangle.y2 += this.y - this.sightTriangle.y1;
        this.sightTriangle.y3 += this.y - this.sightTriangle.y1;
        this.sightTriangle.y1 = this.y;
        this.scene.graphics.lineStyle(1, 0xff0000);
        this.scene.graphics.strokeTriangleShape(this.sightTriangle);
    }

    isFound(player) {
        // get corners of player's collision box
        const playerPoints = [];
        playerPoints.push({x: player.body.x, y: player.body.y});
        playerPoints.push({x: player.body.x + player.body.width, y: player.body.y});
        playerPoints.push({x: player.body.x, y: player.body.y + player.body.height});
        playerPoints.push({x: player.body.x + player.body.width, y: player.body.y + player.body.height});
        return Phaser.Geom.Triangle.ContainsArray(this.sightTriangle, playerPoints).length > 0;
    }

    patrol(player) {
        if (this.patrolStyle === 'horizontal') {
            this.setVelocityX(this.patrolSpeed);
        } else if (this.patrolStyle === 'vertical') {
            
        }
        if (this.isFound(player)) {
            this.moveState = 'chase';
            this.scene.graphics.clear();
            return;
        }
        this.updateSight();
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
        if (this.moveState === 'patrol') this.patrol(player);
        else this.chase(player);
    }
}