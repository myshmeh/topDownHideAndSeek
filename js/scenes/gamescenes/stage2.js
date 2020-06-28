class Stage2 extends Phaser.Scene {
    obstacles;
    player;
    graphics;
    enemy;
    powders;
    itemInfoText;
    previousItems;

    constructor() {
        super({
            key: 'stage2'
        });
    }

    init(data) {
        this.previousItems = data.items;
    }

    createStatics() {
        this.add.image(0, ITEM_BAR_HEIGHT, 'floor').setOrigin(0);
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
        this.enemy = new Enemy(this, 240, 350, 'enemy', 0, 'horizontal', 'triangle');
        this.enemy.createCollisionMove();
        
        // overlap callbacks
        this.physics.add.overlap(this.player, this.powders, this.obtainItem);
        this.physics.add.overlap(this.player, this.enemy, this.arrestPlayer);
        this.physics.add.overlap(this.player, this.goal, clearStage.bind(this, this, 'stage3'));

    }

    update() {
        this.graphics.clear();
        this.drawItems();
        this.player.update();
        this.enemy.update(this.player);
    }
}