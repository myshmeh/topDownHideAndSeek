class Stage4 extends Phaser.Scene {
    constructor() {
        super({
            key: 'stage4'
        });
    }

    init(data) {
        this.previousItems = data.items;
    }

    createStatics() {
        // this.add.image(0, ITEM_BAR_HEIGHT, 'floor').setOrigin(0);
        const tileColNum = WIDTH / 16;
        const tileRowNum = HEIGHT / 16;
        for(let i = 0; i < tileColNum; i++) {
            for(let j = 0; j< tileRowNum; j++) {
                let floor = this.add.image(i * 64, j * 64 + 48, 'tatami_floor').setOrigin(0).setScale(2);
            }
        }

        this.obstacles = this.physics.add.staticGroup();
        // outside borders
        this.obstacles.create(0, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0, 0).setScale(12, 0.01).refreshBody();
        this.obstacles.create(0, HEIGHT + BORDER_THICKNESS, 'obstacle').setOrigin(0, 0.5).setScale(12, 1).refreshBody();
        this.obstacles.create(0 - BORDER_THICKNESS, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0.5, 0).setScale(1, 21).refreshBody();
        this.obstacles.create(WIDTH + BORDER_THICKNESS, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0.5, 0).setScale(1, 21).refreshBody();

        // scatter sticky death drap
        this.traps = this.physics.add.staticGroup();
        this.traps.create(WIDTH * 0.6, HEIGHT * 0.15, 'slime');
        this.traps.create(WIDTH * 0.7, HEIGHT * 0.225, 'slime');
        this.traps.create(WIDTH * 0.8, HEIGHT * 0.3, 'slime');
        this.traps.create(WIDTH * 0.825, HEIGHT * 0.375, 'slime');
        this.traps.create(WIDTH * 0.2, HEIGHT * 0.65, 'slime');
        this.traps.create(WIDTH * 0.25, HEIGHT * 0.725, 'slime');
        this.traps.create(WIDTH * 0.275, HEIGHT * 0.825, 'slime');
        this.traps.create(WIDTH * 0.325, HEIGHT * 0.925, 'slime');
        this.traps.getChildren().forEach(trap => trap.setSize(trap.body.width * 0.75, trap.body.height * 0.75));

        
        // goal
        this.goal = this.physics.add.staticImage(320, 610, 'home');
        this.goal.body.setSize(40, 40);
    }

    drawItems() {
        this.itemInfoText.text = `powder: ${this.player.getItems().powder}`;
    }

    create() {
        this.itemInfoText = this.add.text(16, 10, 'key: 0', { fontSize: '32px', fill: '#fff' });

        this.createStatics();

        // player
        this.player = new Player(this, 70, 100, 'player', 0, this.previousItems);
        this.physics.add.collider(this.player, this.obstacles);

        // enemy
        this.graphics = this.add.graphics();
        const enemies = [
            new Enemy(this, WIDTH * 0.7, HEIGHT * 0.15, 'daddy', 0, 'horizontal', 'triangle', 25),
            new Enemy(this, WIDTH * 0.1, HEIGHT * 0.4, 'daddy', 0, 'idle', 'circle', 0, 200),
            new Enemy(this, WIDTH * 0.9, HEIGHT * 0.7, 'daddy', 0, 'idle', 'circle', 0, 200),
            new Enemy(this, WIDTH * 0.1, HEIGHT * 0.95, 'daddy', 0, 'horizontal', 'triangle', 25)
        ];
        enemies.forEach(enemy => enemy.createCollisionMove());
        this.enemyGroup = this.physics.add.group(enemies);
        
        // overlap callbacks
        this.physics.add.overlap(this.player, this.powders, this.obtainItem);
        this.physics.add.overlap(this.player, this.traps, this.onTrapped);
        this.physics.add.overlap(this.player, this.enemyGroup, this.arrestPlayer);
        this.physics.add.overlap(this.player, this.goal, clearStage.bind(this, this, 'stage5', () => true));

    }

    update() {
        this.graphics.clear();
        this.drawItems();
        this.player.update();
        this.enemyGroup.getChildren().forEach(enemy => enemy.update(this.player));
    }
}