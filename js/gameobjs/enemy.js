'use strict';
class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, patrolStyle, sightShapeType, 
        patrolSpeed=50, chaseSpeed=75, sightDistance=80, sightRange=40, sightRadius=150) {

        super(scene, x, y, texture, frame);
        this.scene = scene;
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.moveState = 'patrol';
        this.patrolStyle = patrolStyle;
        this.patrolSpeed = patrolSpeed;
        this.chaseSpeed = chaseSpeed;
        
        this.sightShapeType = sightShapeType;
        if (this.sightShapeType === 'triangle') {
            this.sightShape = this.createTriangle(x, y, sightDistance, sightRange);
            if (this.patrolSpeed < 0 && this.patrolStyle === 'vertical')
                Phaser.Geom.Triangle.RotateAroundXY(this.sightShape, this.x, this.y, -Math.PI * 0.5);
            else if (this.patrolSpeed > 0 && this.patrolStyle === 'vertical')
                Phaser.Geom.Triangle.RotateAroundXY(this.sightShape, this.x, this.y, Math.PI * 0.5);
            this.scene.graphics.lineStyle(1, 0xff0000);
            this.scene.graphics.strokeTriangleShape(this.sightShape);
        } else {
            this.sightShape = this.createCircle(x, y, sightRadius);
            this.scene.graphics.lineStyle(1, 0xff0000);
            this.scene.graphics.strokeCircleShape(this.sightShape);
        }

        this.setSize(this.body.width * 0.5, this.body.height * 0.5);
        this.setScale(1.75);

        this.play('daddy_walk');
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

    updateSightTriangle() {
        // if 'patrol', re-draw triangle
        this.sightShape.x2 += this.x - this.sightShape.x1;
        this.sightShape.x3 += this.x - this.sightShape.x1;
        this.sightShape.x1 = this.x;
        this.sightShape.y2 += this.y - this.sightShape.y1;
        this.sightShape.y3 += this.y - this.sightShape.y1;
        this.sightShape.y1 = this.y;
    }

    drawSightTriangle() {
        this.scene.graphics.lineStyle(1, 0xff0000);
        this.scene.graphics.strokeTriangleShape(this.sightShape);
    }

    rotateSightTriangle() {
        Phaser.Geom.Triangle.RotateAroundXY(this.sightShape, this.x, this.y, this.patrolSpeed);
    }

    updateSightCircle() {
        this.sightShape.x = this.x;
        this.sightShape.y = this.y;
    }

    drawSightCircle() {
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
            // update sight per moving
            if (this.sightShapeType === 'triangle') {
                this.updateSightTriangle();
            } else {
                this.updateSightCircle();
            }
            // move anim
            if (this.patrolSpeed > 0) {
                this.angle = 90;
            } else {
                this.angle = -90;
            }
        } else if (this.patrolStyle === 'vertical') {
            this.setVelocityY(this.patrolSpeed);
            // update sight per moving
            if (this.sightShapeType === 'triangle') {
                this.updateSightTriangle();
            } else {
                this.updateSightCircle();
            }
            // move anim
            if (this.patrolSpeed > 0) {
                this.angle = 180;
            } else {
                this.angle = 0;
            }
        } else if (this.patrolStyle === 'rotate') {
            this.rotateSightTriangle();
        } else if (this.patrolStyle === 'idle') {
            // noting to do    
        }
        // when player is found
        if (this.isFound(player)) {
            this.play('daddy_run');
            this.moveState = 'chase';
            this.scene.graphics.clear();
            return;
        }
        // draw sight
        if (this.sightShapeType === 'triangle') this.drawSightTriangle();
        if (this.sightShapeType === 'circle') this.drawSightCircle();
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
        this.angle = Math.atan2(yVectorNorm, xVectorNorm) * 180 / Math.PI + 90;
        this.setVelocity(xVectorNorm * this.chaseSpeed, yVectorNorm * this.chaseSpeed); // coefficient determines speed
    }

    update(player) {
        if (this.moveState === 'patrol') this.patrol(player);
        else this.chase(player);
    }
}