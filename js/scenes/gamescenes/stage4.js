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
        this.traps.create(WIDTH * 0.55, HEIGHT * 0.15, 'trap');
        this.traps.create(WIDTH * 0.65, HEIGHT * 0.225, 'trap');
        this.traps.create(WIDTH * 0.75, HEIGHT * 0.3, 'trap');
        this.traps.create(WIDTH * 0.7725, HEIGHT * 0.375, 'trap');
        this.traps.create(WIDTH * 0.25, HEIGHT * 0.65, 'trap');
        this.traps.create(WIDTH * 0.275, HEIGHT * 0.725, 'trap');
        this.traps.create(WIDTH * 0.325, HEIGHT * 0.825, 'trap');
        this.traps.create(WIDTH * 0.375, HEIGHT * 0.925, 'trap');
        this.traps.getChildren().forEach(trap => trap.setSize(trap.body.width * 0.75, trap.body.height * 0.75));

        // powders for only draw inventry
        this.hiddenPowders = [];
        for (let i = 0; i<5; i++) this.hiddenPowders.push(this.add.image(-WIDTH, -HEIGHT, 'powder').setScale(0.7));
        
        // goal
        this.goal = this.physics.add.staticImage(WIDTH * 0.8, HEIGHT * 0.985, 'door').setScale(3).refreshBody().setOrigin(0.5, 0.9);
        this.goal.body.setSize(84, 20);
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
        this.player = new Player(this, 70, 100, 'player', 0, this.previousItems);
        this.physics.add.collider(this.player, this.obstacles);

        // enemy
        this.graphics = this.add.graphics();
        const enemies = [
            new Enemy(this, WIDTH * 0.7, HEIGHT * 0.15, 'daughter', 0, 'horizontal', 'triangle', 25),
            new Enemy(this, WIDTH * 0.125, HEIGHT * 0.4, 'grandpa', 0, 'idle', 'circle', 0, 200),
            new Enemy(this, WIDTH * 0.875, HEIGHT * 0.7, 'grandma', 0, 'idle', 'circle', 0, 200),
            new Enemy(this, WIDTH * 0.1, HEIGHT * 0.95, 'son', 0, 'horizontal', 'triangle', 25)
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
        if (this.player.isDead() && !this.deadProcessed) {
            this.deadProcessed = true;
            this.restartStage();
        }
    }
}