class Stage2 extends Phaser.Scene {
    constructor() {
        super({
            key: 'stage2'
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

        // inside obstacle
        this.obstacles.create(300, 220, 'obstacle').setScale(2).refreshBody();
        this.obstacles.create(100, 350, 'obstacle').setScale(2).refreshBody();
        this.obstacles.create(250, 500, 'obstacle').setScale(2).refreshBody();
        // outside borders
        this.obstacles.create(0, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0, 0).setScale(12, 0.01).refreshBody();
        this.obstacles.create(0, HEIGHT + BORDER_THICKNESS, 'obstacle').setOrigin(0, 0.5).setScale(12, 1).refreshBody();
        this.obstacles.create(0 - BORDER_THICKNESS, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0.5, 0).setScale(1, 21).refreshBody();
        this.obstacles.create(WIDTH + BORDER_THICKNESS, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0.5, 0).setScale(1, 21).refreshBody();

        // scatter powder
        this.powders = this.physics.add.staticGroup();
        this.powders.create(WIDTH * 0.8, HEIGHT * 0.2, 'powder');
        this.powders.create(WIDTH * 0.3, HEIGHT * 0.8, 'powder');
        this.powders.getChildren().forEach(powder => {
            powder.name = 'powder';
            powder.setSize(powder.body.width * 0.75, powder.body.height * 0.75);
            this.tweens.add({ targets: powder, duration: 700, alpha: 0.5, yoyo: true, repeat: -1, ease: 'Cubic.easeIn', delay: Math.random() * 500});
        });
        // powders for only draw inventry
        this.hiddenPowders = [];
        for (let i = 0; i<5; i++) this.hiddenPowders.push(this.add.image(-WIDTH, -HEIGHT, 'powder').setScale(0.7));

        // goal
        this.goal = this.physics.add.staticImage(320, 635, 'door');
        this.goal.setScale(2).refreshBody();
        this.goal.body.setSize(50, 50);
        this.doorLight = this.physics.add.staticImage(320, 635, 'door_light');
        this.doorLight.setScale(2).refreshBody();
        this.doorLight.alpha = 0.6;
        this.doorLight.tint = 0xffffcc;
        this.tweens.add({
            targets: this.doorLight,
            alpha: 0.2,
            repeat: -1,
            duration: 2000,
            yoyo: true,
            ease: 'Quad.easeIn'
        });
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
        this.enemy = new Enemy(this, 240, 350, 'daddy', 0, 'horizontal', 'triangle');
        this.enemy.createCollisionMove();
        
        // overlap callbacks
        this.physics.add.overlap(this.player, this.powders, this.obtainItem);
        this.physics.add.overlap(this.player, this.enemy, this.arrestPlayer);
        this.physics.add.overlap(this.player, this.goal, clearStage.bind(this, this, 'stage3', () => true)); //debug this

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