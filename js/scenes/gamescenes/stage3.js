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
        this.add.image(0, ITEM_BAR_HEIGHT, 'floor').setOrigin(0);
        this.obstacles = this.physics.add.staticGroup();

        // outside borders
        this.obstacles.create(0, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0, 0).setScale(12, 0.01).refreshBody();
        this.obstacles.create(0, HEIGHT + BORDER_THICKNESS, 'obstacle').setOrigin(0, 0.5).setScale(12, 1).refreshBody();
        this.obstacles.create(0 - BORDER_THICKNESS, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0.5, 0).setScale(1, 21).refreshBody();
        this.obstacles.create(WIDTH + BORDER_THICKNESS, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0.5, 0).setScale(1, 21).refreshBody();

        // scatter powder
        this.powders = this.physics.add.staticGroup();
        this.powders.create(WIDTH * 0.15, HEIGHT * 0.95, 'powder');
        this.powders.getChildren().forEach(powder => powder.name = 'powder');

        // scatter sticky death drap
        this.traps = this.physics.add.staticGroup();
        this.traps.create(WIDTH * 0.6, HEIGHT * 0.2, 'slime');
        this.traps.create(WIDTH * 0.4, HEIGHT * 0.25, 'slime');
        this.traps.create(WIDTH * 0.3, HEIGHT * 0.35, 'slime');
        this.traps.create(WIDTH * 0.1, HEIGHT * 0.5, 'slime');
        this.traps.create(WIDTH * 0.25, HEIGHT * 0.525, 'slime');
        this.traps.create(WIDTH * 0.075, HEIGHT * 0.7, 'slime');
        this.traps.create(WIDTH * 0.35, HEIGHT * 0.7, 'slime');
        this.traps.create(WIDTH * 0.15, HEIGHT * 0.85, 'slime');
        this.traps.create(WIDTH * 0.5, HEIGHT * 0.8, 'slime');
        this.traps.create(WIDTH * 0.6, HEIGHT * 0.9, 'slime');

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
        this.enemy = new Enemy(this, 240, 350, 'enemy', 0, 'idle', 'circle', 0, 100);
        this.enemy.createCollisionMove();
        
        // overlap callbacks
        this.physics.add.overlap(this.player, this.powders, this.obtainItem);
        this.physics.add.overlap(this.player, this.traps, this.onTrapped);
        this.physics.add.overlap(this.player, this.enemy, this.arrestPlayer);
        this.physics.add.overlap(this.player, this.goal, clearStage.bind(this, this, 'stage4'));

    }

    update() {
        this.graphics.clear();
        this.drawItems();
        this.player.update();
        this.enemy.update(this.player);
    }
}