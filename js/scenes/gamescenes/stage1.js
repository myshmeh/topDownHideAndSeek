class Stage1 extends Phaser.Scene {
    itemInfoText;
    obstacles;
    border;
    enemyGroup;
    key;
    goal;
    player;
    cursors;
    isArrested;
    graphics;

    constructor() {
        super({
            key: 'stage1'
        });
    }

    createStatics() {
        this.add.image(0, ITEM_BAR_HEIGHT, 'asphalt').setOrigin(0);
        this.obstacles = this.physics.add.staticGroup();

        // item
        this.key = this.physics.add.staticImage(WIDTH * 0.5, HEIGHT * 0.5, 'key');
        this.key.name = 'key';

        // outside border
        this.obstacles.create(0, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0, 0).setScale(12, 0.5).refreshBody();
        this.obstacles.create(0, HEIGHT, 'obstacle').setOrigin(0, 0.5).setScale(12, 1).refreshBody();
        this.obstacles.create(0, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0.5, 0).setScale(1, 21).refreshBody();
        this.obstacles.create(WIDTH, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0.5, 0).setScale(1, 21).refreshBody();
        this.goal = this.physics.add.staticImage(320, 610, 'home');
        this.goal.body.setSize(1, 1);
    }

    drawItems() {
        this.itemInfoText.text = `key: ${this.player.getItems().key}`;
    }

    create() {
        // draw item information
        // this.itemInfoText = this.add.text(16, 10, 'items: 0', { fontFamily: FONTS.PRESS_START_2P, fontSize: '32px', fill: '#fff' });
        this.itemInfoText = this.add.text(16, 10, 'key: 0', { fontSize: '32px', fill: '#fff' });

        // platforms
        this.createStatics();
        // player
        this.player = new Player(this, 70, 100, 'player', 0, { key: 0, powder: 0});
        this.physics.add.collider(this.player, this.obstacles);

        // enemy
        this.graphics = this.add.graphics();
        const enemies = [
            new Enemy(this, 140, 250, 'enemy', 0, 'horizontal', 'triangle'),
            new Enemy(this, 240, 440, 'enemy', 0, 'horizontal', 'triangle')
        ];
        enemies.forEach(enemy => enemy.createCollisionMove());
        this.enemyGroup = this.physics.add.group(enemies);
        
        // player overlaps (overlap callbacks are in phaser_addon.js)
        this.physics.add.overlap(this.player, this.enemyGroup, this.arrestPlayer);
        this.physics.add.overlap(this.player, this.key, this.obtainItem);
        this.physics.add.overlap(this.player, this.goal, clearStage.bind(this, this, 'stage2'));
    }

    update() {
        this.graphics.clear();
        this.drawItems();
        this.player.update();
        this.enemyGroup.getChildren().forEach(enemy => enemy.update(this.player));
    }
}