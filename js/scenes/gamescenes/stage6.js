class Stage6 extends Phaser.Scene {
    constructor() {
        super({
            key: 'stage6'
        });
    }

    init(data) {
        this.previousItems = data.items;
    }

    createStatics() {
        const tileColNum = WIDTH / 32;
        const tileRowNum = HEIGHT / 32;
        for(let i = 0; i < tileColNum; i++) {
            for(let j = 0; j< tileRowNum; j++) {
                let floor = this.add.image(i * 32, j * 32 + 48, 'wood_floor').setOrigin(0);
            }
        }

        this.obstacles = this.physics.add.staticGroup();
        // outside borders
        this.obstacles.create(0, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0, 0).setScale(12, 0.01).refreshBody();
        this.obstacles.create(0, HEIGHT + BORDER_THICKNESS, 'obstacle').setOrigin(0, 0.5).setScale(12, 1).refreshBody();
        this.obstacles.create(0 - BORDER_THICKNESS, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0.5, 0).setScale(1, 21).refreshBody();
        this.obstacles.create(WIDTH + BORDER_THICKNESS, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0.5, 0).setScale(1, 21).refreshBody();
        // inside borders
        for (let i = 0; i < 10; i++) {
            this.obstacles.create(32 * i, HEIGHT * 0.3, 'kitchen', 0);
            this.obstacles.create(32 * i, HEIGHT * 0.3 + 32, 'kitchen', 0);
            this.obstacles.create(WIDTH - 32 * i, HEIGHT * 0.6, 'kitchen', 0);
            this.obstacles.create(WIDTH - 32 * i, HEIGHT * 0.6 + 32, 'kitchen', 0);
        }
        this.obstacles.create(WIDTH * 0.35, HEIGHT * 0.82, 'fridge').setScale(2.5, 1.5).refreshBody().setAngle(-180);
        this.obstacles.create(WIDTH * 0.65, HEIGHT * 0.82, 'trash_bins', 0).setScale(1.35).refreshBody();
        this.obstacles.create(WIDTH * 0.75, HEIGHT * 0.82, 'trash_bins', 1).setScale(1.35).refreshBody();
        this.add.image(32 * 4, HEIGHT * 0.3, 'kitchen', 1);
        this.add.image(32 * 5, HEIGHT * 0.3, 'kitchen', 2);
        this.add.image(32 * 6, HEIGHT * 0.3, 'kitchen', 3);
        this.add.image(32 * 4, HEIGHT * 0.3 + 32, 'kitchen', 4);
        this.add.image(32 * 5, HEIGHT * 0.3 + 32, 'kitchen', 5);
        this.add.image(32 * 6, HEIGHT * 0.3 + 32, 'kitchen', 6);
        this.add.image(WIDTH - 32 * 6, HEIGHT * 0.6, 'kitchen', 7);
        this.add.image(WIDTH - 32 * 5, HEIGHT * 0.6, 'kitchen', 8);
        this.add.image(WIDTH - 32 * 4, HEIGHT * 0.6, 'kitchen', 9);
        this.add.image(WIDTH - 32 * 6, HEIGHT * 0.6 + 32, 'kitchen', 10);
        this.add.image(WIDTH - 32 * 5, HEIGHT * 0.6 + 32, 'kitchen', 11);
        this.add.image(WIDTH - 32 * 4, HEIGHT * 0.6 + 32, 'kitchen', 12);

        // powders for only draw inventry
        this.hiddenPowders = [];
        for (let i = 0; i<5; i++) this.hiddenPowders.push(this.add.image(-WIDTH, -HEIGHT, 'powder').setScale(0.7));

        // goal
        const goalX = WIDTH * 0.82;
        const goalY = HEIGHT * 0.96;
        this.add.image(goalX, goalY, 'trap').setScale(2);
        this.goal = this.physics.add.staticImage(goalX, goalY, 'fiona_idle', 10);
        this.tweens.add({ targets: this.goal, duration: 700, alpha: 0.5, yoyo: true, repeat: -1, ease: 'Cubic.easeIn', delay: Math.random() * 500});
    }

    drawItems() {
        this.hiddenPowders.forEach(hiddenPowder => hiddenPowder.setPosition(-WIDTH, -HEIGHT));
        const currentPowder = this.player.getItems().powder;
        if (currentPowder) {
            for (let i = 0; i < currentPowder; i++) {
                this.hiddenPowders[i].setPosition(i * 50 + 129, 25, 1);
            }
        }
    }

    create() {
        // store item information
        this.add.rectangle(0, 0, WIDTH, HEIGHT, 0x602b10).setOrigin(0);
        for(let i=0; i<5; i++) this.add.image(i * 50 + 110, 5, 'inventory_chunk').setScale(1.2).setOrigin(0);
        this.add.image(-20, -20, 'roach_idle', 0).setScale(4.5).setOrigin(0);
        const thickness = 2;
        this.add.rectangle(0, 0, WIDTH, thickness, 0x944a25).setOrigin(0);
        this.add.rectangle(0, ITEM_BAR_HEIGHT - thickness, WIDTH, ITEM_BAR_HEIGHT, 0x944a25).setOrigin(0);
        this.add.rectangle(0, 0, thickness, ITEM_BAR_HEIGHT, 0x944a25).setOrigin(0);
        this.add.rectangle(WIDTH - thickness, 0, WIDTH, ITEM_BAR_HEIGHT, 0x944a25).setOrigin(0);

        this.createStatics();

        // player
        this.player = new Player(this, WIDTH * 0.1, HEIGHT * 0.15, 'player', 0, this.previousItems);
        this.physics.add.collider(this.player, this.obstacles);

        // enemy
        this.graphics = this.add.graphics();
        const enemies = [
            new Enemy(this, WIDTH * 0.6, HEIGHT * 0.7, 'mom', 0, 'rotate', 'triangle', -Math.PI * 0.0075, 150, 235, 40, 0),
            new Enemy(this, WIDTH * 0.35, HEIGHT * 0.225, 'son', 0, 'vertical', 'triangle', 40),
            new Enemy(this, WIDTH * 0.5, HEIGHT * 0.15, 'daughter', 0, 'vertical', 'triangle', 40),
            new Enemy(this, WIDTH * 0.65, HEIGHT * 0.1, 'son3', 0, 'vertical', 'triangle', 40),
            new Enemy(this, WIDTH * 0.65, HEIGHT * 0.4, 'grandma2', 0, 'horizontal', 'triangle', 40),
            new Enemy(this, WIDTH * 0.7, HEIGHT * 0.9, 'man', 0, 'vertical', 'triangle', 40),
        ];
        enemies.forEach(enemy => {
            enemy.createCollisionMove();
        });
        this.enemyGroup = this.physics.add.group(enemies);
        
        // overlap callbacks
        this.physics.add.overlap(this.player, this.powders, this.obtainItem);
        this.physics.add.overlap(this.player, this.traps, this.onTrapped);
        this.physics.add.overlap(this.player, this.enemyGroup, this.arrestPlayer);
        this.physics.add.overlap(this.player, this.goal, () => this.scene.start('ending1', { items: this.player.getItems() }));

    }

    update() {
        this.graphics.clear();
        this.drawItems();
        this.player.update();
        this.enemyGroup.getChildren().forEach(enemy => enemy.update(this.player));
        if (this.player.isDead() && !this.deadProcessed) {
            this.deadProcessed = true;
            this.restartStage();
        }
    }
}