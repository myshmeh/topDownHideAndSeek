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
        this.lights.enable().setAmbientColor(0xaaaaaa);

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
        this.powders.getChildren().forEach(powder => powder.name = 'powder');

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
        this.enemy = new Enemy(this, 240, 350, 'daddy_walk', 0, 'horizontal', 'triangle');
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
    }
}