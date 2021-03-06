class Stage3 extends Phaser.Scene {
    constructor() {
        super({
            key: 'stage3'
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
        this.obstacles.create(WIDTH * 0.535, HEIGHT * 0.17, 'desks', 0).setScale(2.5).refreshBody().setDepth(DEPTH_MID).body.setSize(95, 75);
        this.obstacles.create(WIDTH * 0.475, HEIGHT * 0.91, 'desks', 1).setScale(2.5).refreshBody().setAngle(180).setDepth(DEPTH_MID).body.setSize(95, 75);
        this.obstacles.create(WIDTH * 0.85, HEIGHT * 0.2, 'bed', 0).setScale(4).refreshBody().body.setSize(80, 120);
        this.obstacles.create(WIDTH * 0.15, HEIGHT * 0.875, 'bed', 0).setScale(4).refreshBody().setAngle(180).setDepth(DEPTH_MID).body.setSize(80, 120);
        this.obstacles.create(WIDTH * 0.08, HEIGHT * 0.39, 'shelf', 0).setScale(2).refreshBody().setAngle(-90).setDepth(DEPTH_MID).body.setSize(64, 44);
        this.obstacles.create(WIDTH * 0.08, HEIGHT * 0.47, 'shelf_w_flower', 0).setScale(2).refreshBody().setAngle(-90).setDepth(DEPTH_MID).body.setSize(64, 44);
        this.obstacles.create(WIDTH * 0.08, HEIGHT * 0.55, 'shelf', 0).setScale(2).refreshBody().setAngle(-90).setDepth(DEPTH_MID).body.setSize(64, 44);

        this.add.image(WIDTH * 0.65, HEIGHT * 0.5, 'carpet2').setScale(5);
        this.obstacles.create(WIDTH * 0.7, HEIGHT * 0.45, 'carpet2').setScale(2).refreshBody().setTintFill(0x855f3e).body.setSize(48, 48);

        // scatter powder
        this.powders = this.physics.add.staticGroup();
        this.powders.create(WIDTH * 0.1, HEIGHT * 0.98, 'powder');
        this.powders.getChildren().forEach(powder => {
            powder.name = 'powder';
            powder.setSize(powder.body.width * 0.75, powder.body.height * 0.75);
            this.tweens.add({ targets: powder, duration: 700, alpha: 0.5, yoyo: true, repeat: -1, ease: 'Cubic.easeIn', delay: Math.random() * 500});
        });
        // powders for only draw inventry
        this.hiddenPowders = [];
        for (let i = 0; i<5; i++) this.hiddenPowders.push(this.add.image(-WIDTH, -HEIGHT, 'powder').setScale(0.7));

        // scatter sticky death drap
        this.traps = this.physics.add.staticGroup();
        this.traps.create(WIDTH * 0.3, HEIGHT * 0.35, 'trap');
        this.traps.create(WIDTH * 0.2, HEIGHT * 0.525, 'trap');
        this.traps.create(WIDTH * 0.352, HEIGHT * 0.75, 'trap');
        this.traps.create(WIDTH * 0.5, HEIGHT * 0.81, 'trap');
        this.traps.getChildren().forEach(trap => trap.setSize(trap.body.width * 0.75, trap.body.height * 0.75));

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
        this.enemy = new Enemy(this, 240, 350, 'son2', 0, 'idle', 'circle', 0);
        this.enemy.createCollisionMove();
        
        // overlap callbacks
        this.physics.add.overlap(this.player, this.powders, this.obtainItem);
        this.physics.add.overlap(this.player, this.traps, this.onTrapped);
        this.physics.add.overlap(this.player, this.enemy, this.arrestPlayer);
        this.physics.add.overlap(this.player, this.goal, clearStage.bind(this, this, 'stage4', () => true));

    }

    update() {
        this.graphics.clear();
        this.drawItems();
        this.player.update();
        this.enemy.update(this.player);
        if (this.player.isDead() && !this.deadProcessed) {
            this.deadProcessed = true;
            this.restartStage();
        }
    }
}