class PrototypeStage extends Phaser.Scene {
    obstacles;
    border;
    enemy;
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
    }

    createStatics() {
        this.add.image(0, 0, 'floor').setOrigin(0);
        this.obstacles = this.physics.add.staticGroup();
        this.obstacles.create(320, 240, 'obstacle').setScale(2).refreshBody();
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
        this.player = new Player(this, 100, 100, 'player', 0);
        this.physics.add.collider(this.player, this.obstacles);

        // enemy
        this.graphics = this.add.graphics();
        this.enemy = new Enemy(this, 200, 200, 'enemy', 0, 'horizontal', 80, 40);
        this.enemy.createCollisionMove();
        
        // player overlaps
        const arrestPlayer = (enemy, player) => {
            player.play('idle');
            player.disableBody(true);
            enemy.play('enemyIdle');
            enemy.disableBody(true);
            player.setTint(0xff0000);
            console.log('Player was Arrested!');
        };
        this.physics.add.overlap(this.enemy, this.player, arrestPlayer);

        const clearStage = (player, goal) => {
            player.play('idle');
            player.disableBody(true);
            this.enemy.play('enemyIdle');
            this.enemy.disableBody(true);
            console.log('Congratullation!');
        };
        this.physics.add.overlap(this.player, this.goal, clearStage);
    }

    update() {
        this.player.update();
        this.enemy.update(this.player);
    }
}