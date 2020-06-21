class Enemy extends Phaser.Physics.Arcade.Sprite {
    moveState;
    patrolStyle;
    patrolSpeed;
    chaseSpeed;
    scene;
    sightShape;
    sightShapeType;

    constructor(scene, x, y, texture, frame, patrolStyle, sightShapeType, patrolSpeed=25, chaseSpeed=50) {
        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.initAnims(scene);

        this.moveState = 'patrol';
        this.patrolStyle = patrolStyle;
        this.patrolSpeed = patrolSpeed;
        this.chaseSpeed = chaseSpeed;
        
        this.sightShapeType = sightShapeType;
        if (this.sightShapeType === 'triangle') {
            this.sightShape = this.createTriangle(x, y, 80, 40);
            this.scene.graphics.lineStyle(1, 0xff0000);
            this.scene.graphics.strokeTriangleShape(this.sightShape);
        } else {
            this.sightShape = this.createCircle(x, y, 150);
            this.scene.graphics.lineStyle(1, 0xff0000);
            this.scene.graphics.strokeCircleShape(this.sightShape);
        }
    }

    createTriangle(vertexX, vertexY, sightDistance, sightRange) {
        const point1X = vertexX + sightDistance; 
        const point1Y = vertexY + sightRange;
        const point2X = vertexX + sightDistance;
        const point2Y = vertexY - sightRange;
        return new Phaser.Geom.Triangle(vertexX, vertexY, point1X, point1Y, point2X, point2Y);
    }

    createCircle(enemyX, enemyY, sightRadius) {
        return new Phaser.Geom.Circle(enemyX, enemyY, sightRadius);
    }

    createCollisionMove() {
        this.scene.physics.add.collider(this, this.scene.obstacles, () => {
            this.patrolSpeed *= -1;
            Phaser.Geom.Triangle.RotateAroundXY(this.sightShape, this.x, this.y, Math.PI);
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

    updateSightTriangle() {
        // if 'patrol', re-draw triangle
        this.sightShape.x2 += this.x - this.sightShape.x1;
        this.sightShape.x3 += this.x - this.sightShape.x1;
        this.sightShape.x1 = this.x;
        this.sightShape.y2 += this.y - this.sightShape.y1;
        this.sightShape.y3 += this.y - this.sightShape.y1;
        this.sightShape.y1 = this.y;
        this.scene.graphics.lineStyle(1, 0xff0000);
        this.scene.graphics.strokeTriangleShape(this.sightShape);
    }

    updateSightCircle() {
        this.scene.graphics.lineStyle(1, 0xff0000);
        this.scene.graphics.strokeCircleShape(this.sightShape);
    }

    isFound(player) {
        // get corners of player's collision box
        const playerPoints = [];
        playerPoints.push({x: player.body.x, y: player.body.y});
        playerPoints.push({x: player.body.x + player.body.width, y: player.body.y});
        playerPoints.push({x: player.body.x, y: player.body.y + player.body.height});
        playerPoints.push({x: player.body.x + player.body.width, y: player.body.y + player.body.height});
        if (this.sightShapeType === 'triangle') return Phaser.Geom.Triangle.ContainsArray(this.sightShape, playerPoints).length > 0;
        else return playerPoints.some(point => Phaser.Geom.Circle.ContainsPoint(this.sightShape, point));
    }

    patrol(player) {
        if (this.patrolStyle === 'horizontal') {
            this.setVelocityX(this.patrolSpeed);
        } else if (this.patrolStyle === 'vertical') {
            
        } else if (this.patrolStyle === 'idle') {
            // noting to do    
        }
        // when player is found
        if (this.isFound(player)) {
            this.moveState = 'chase';
            this.scene.graphics.clear();
            return;
        }
        // draw sight
        if (this.sightShapeType === 'triangle') this.updateSightTriangle();
        if (this.sightShapeType === 'circle') this.updateSightCircle();
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
        this.setVelocity(xVectorNorm * this.chaseSpeed, yVectorNorm * this.chaseSpeed); // coefficient determines speed
    }

    update(player) {
        if (this.moveState === 'patrol') this.patrol(player);
        else this.chase(player);
    }
}