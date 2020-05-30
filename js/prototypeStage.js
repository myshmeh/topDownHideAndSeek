class PrototypeStage extends Phaser.Scene {
    obstacles;
    border;
    enemyGroup;
    goal;
    player;
    cursors;
    isArrested;
    graphics;

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
        console.log(this.load.textureManager);
    }

    createStatics() {
        this.add.image(0, 0, 'floor').setOrigin(0);
        this.obstacles = this.physics.add.staticGroup();
        // inside obstacle
        this.obstacles.create(150, 150, 'obstacle').setScale(2).refreshBody();
        this.obstacles.create(475, 150, 'obstacle').setScale(2).refreshBody();
        this.obstacles.create(150, 350, 'obstacle').setScale(2).refreshBody();
        this.obstacles.create(475, 350, 'obstacle').setScale(2).refreshBody();

        // outside border
        this.obstacles.create(0, 0, 'obstacle').setOrigin(0, 0.5).setScale(20, 1).refreshBody();
        this.obstacles.create(0, 480, 'obstacle').setOrigin(0, 0.5).setScale(20, 1).refreshBody();
        this.obstacles.create(0, 16, 'obstacle').setOrigin(0.5, 0).setScale(1, 20).refreshBody();
        this.obstacles.create(640, 16, 'obstacle').setOrigin(0.5, 0).setScale(1, 20).refreshBody();
        this.goal = this.physics.add.staticImage(600, 440, 'goal');
        this.goal.body.setSize(1, 1);
    }

    create() {
        // platforms
        this.createStatics();
        // player
        this.player = new Player(this, 80, 80, 'player', 0);
        this.physics.add.collider(this.player, this.obstacles);

        // enemy
        this.graphics = this.add.graphics();
        const enemies = [
            new Enemy(this, 240, 240, 'enemy', 0, 'horizontal'), 
            new Enemy(this, 240, 80, 'enemy', 0, 'horizontal'),
            new Enemy(this, 240, 400, 'enemy', 0, 'horizontal'),
        ];
        enemies.forEach(enemy => enemy.createCollisionMove());
        this.enemyGroup = this.physics.add.group(enemies);
        
        // player overlaps
        // NOTE: world.collideSpriteVsGroup() is opinionated in passing args
        const arrestPlayer = (player, enemy) => {
            console.log(enemy);
            console.log(player);
            player.play('idle');
            player.disableBody(true);
            enemy.play('enemyIdle');
            enemy.disableBody(true);
            player.setTint(0xff0000);
            console.log('Player was Arrested!');
        };
        this.physics.add.overlap(this.player, this.enemyGroup, arrestPlayer);

        const clearStage = (player, goal) => {
            player.play('idle');
            player.disableBody(true);
            this.enemyGroup.getChildren().forEach(enemy => {
                enemy.play('enemyIdle');
                enemy.disableBody(true)}
            );
            console.log('Congratullation!');
        };
        this.physics.add.overlap(this.player, this.goal, clearStage);
    }

    update() {
        this.graphics.clear();
        this.player.update();
        this.enemyGroup.getChildren().forEach(enemy => enemy.update(this.player));
    }
}