'use strict';
class Stage1 extends Phaser.Scene {
    constructor() {
        super({
            key: 'stage1'
        });
    }

    createStatics() {
        this.add.image(0, ITEM_BAR_HEIGHT, 'asphalt').setOrigin(0);

        const tileColNum = WIDTH / 32;
        const tileRowNum = HEIGHT / 32;
        for(let i = 0; i < tileColNum; i++) {
            for(let j = 0; j< tileRowNum; j++) {
                if (j > tileRowNum * 0.25 && j < tileRowNum * 0.5) continue;
                this.add.image(i * 32, j * 32 + 50, 'stone_floor').setOrigin(0);
            }
        }
        
        // item
        this.key = this.physics.add.staticImage(WIDTH * 0.6, HEIGHT * 0.65, 'key').setScale(0.6).refreshBody();
        this.key.name = 'key';
        this.key.angle = 45;
        this.key.body.setSize(16, 16);
        
        // outside border
        this.obstacles = this.physics.add.staticGroup();
        this.obstacles.create(0, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0, 0).setScale(12, 0.1).refreshBody();
        this.obstacles.create(0, HEIGHT, 'obstacle').setOrigin(0, 0.5).setScale(12, 0.1).refreshBody();
        this.obstacles.create(0, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(1, 0).setScale(1, 21).refreshBody();
        this.obstacles.create(WIDTH, ITEM_BAR_HEIGHT, 'obstacle').setOrigin(0, 0).setScale(1, 21).refreshBody();

        this.goal = this.physics.add.staticImage(WIDTH * 0.75, HEIGHT * 0.9, 'house').setScale(4).refreshBody();
        this.goal.angle = 90;
        this.goal.body.setSize(32 * 4, 32 * 2.5);

        const flower = this.physics.add.staticImage(WIDTH * 0.45, HEIGHT * 0.92, 'flowers', 1).setScale(2.5).refreshBody();
        flower.body.setSize(32 * 2.25, 16 * 3);
        const flower2 = this.physics.add.staticImage(WIDTH * 0.23, HEIGHT * 0.92, 'flowers', 0).setScale(2.5).refreshBody();
        flower2.body.setSize(32 * 2.25, 16 * 3);
        this.obstacles.add(flower);
        this.obstacles.add(flower2);
    }

    drawItems() {
        this.itemInfoText.text = `key: ${this.player.getItems().key}`;
    }

    create() {
        // draw item information
        this.itemInfoText = this.add.text(16, 10, 'key: 0', { fontSize: '32px', fill: '#fff' });
        this.add.rectangle(0, 0, WIDTH, HEIGHT, 0x602b10).setOrigin(0);
        for(let i=0; i<5; i++) this.add.image(i * 50 + 110, 5, 'inventory_chunk').setScale(1.2).setOrigin(0);
        this.add.image(-20, -20, 'roach_idle', 0).setScale(4.5).setOrigin(0);
        const thickness = 2;
        this.add.rectangle(0, 0, WIDTH, thickness, 0x944a25).setOrigin(0);
        this.add.rectangle(0, ITEM_BAR_HEIGHT - thickness, WIDTH, ITEM_BAR_HEIGHT, 0x944a25).setOrigin(0);
        this.add.rectangle(0, 0, thickness, ITEM_BAR_HEIGHT, 0x944a25).setOrigin(0);
        this.add.rectangle(WIDTH - thickness, 0, WIDTH, ITEM_BAR_HEIGHT, 0x944a25).setOrigin(0);

        // platforms
        this.createStatics();
        // player
        this.player = new Player(this, 70, 100, 'roach_idle', 0, { key: 0, powder: 0});
        this.physics.add.collider(this.player, this.obstacles);

        // enemy
        this.graphics = this.add.graphics();
        const enemies = [
            new Enemy(this, 140, 200, 'daddy_walk', 0, 'horizontal', 'triangle'),
            new Enemy(this, 240, 450, 'daddy_walk', 0, 'horizontal', 'triangle')
        ];
        enemies.forEach(enemy => enemy.createCollisionMove());
        this.enemyGroup = this.physics.add.group(enemies);
        
        // player overlaps (overlap callbacks are in phaser_addon.js)
        this.physics.add.overlap(this.player, this.enemyGroup, this.arrestPlayer);
        this.physics.add.overlap(this.player, this.key, this.obtainItem);
        this.physics.add.collider(this.player, this.goal, clearStage.bind(this, this, 'stage2', () => this.player.getItems().key));

        this.add.rectangle(0, ITEM_BAR_HEIGHT, WIDTH, HEIGHT, 0x111100, 0.25).setOrigin(0);
        this.add.circle(WIDTH * 0.25, HEIGHT * 0.33, 110, 0xffffcc, 0.15);
        this.add.circle(WIDTH * 0.75, HEIGHT * 0.33, 110, 0xffffcc, 0.15);
        this.add.circle(WIDTH * 0.25, HEIGHT * 0.65, 110, 0xffffcc, 0.15);
        this.add.circle(WIDTH * 0.75, HEIGHT * 0.65, 110, 0xffffcc, 0.15);

        const lightPoles = this.physics.add.staticGroup();
        const p1 = this.physics.add.staticImage(WIDTH * 0.25, HEIGHT * 0.75, 'light_pole').setScale(2).refreshBody();
        p1.body.setSize(12, 64);
        lightPoles.add(p1);
        const p2 = this.physics.add.staticImage(WIDTH * 0.75, HEIGHT * 0.75, 'light_pole').setScale(2).refreshBody();
        p2.body.setSize(12, 64);
        lightPoles.add(p2);
        const p3 = this.physics.add.staticImage(WIDTH * 0.25, HEIGHT * 0.15, 'light_pole_down').setScale(2).refreshBody();
        p3.body.setSize(12, 64);
        lightPoles.add(p3);
        const p4 = this.physics.add.staticImage(WIDTH * 0.75, HEIGHT * 0.15, 'light_pole_down').setScale(2).refreshBody();
        p4.body.setSize(12, 64);
        lightPoles.add(p4);
        this.physics.add.collider(this.player, lightPoles);
    }

    update() {
        this.graphics.clear();
        this.drawItems();
        this.player.update();
        this.enemyGroup.getChildren().forEach(enemy => enemy.update(this.player));
    }
}