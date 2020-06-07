class Stage2 extends Phaser.Scene {
    obstacles;
    player;
    itemInfoText;

    constructor() {
        super({
            key: 'stage2'
        });
    }

    createStatics() {
        this.add.image(0, 50, 'floor').setOrigin(0);
        this.obstacles = this.physics.add.staticGroup();

        // inside obstacle
        this.obstacles.create(150, 150, 'obstacle').refreshBody();
        this.obstacles.create(475, 150, 'obstacle').refreshBody();
        this.obstacles.create(150, 350, 'obstacle').refreshBody();
        this.obstacles.create(475, 350, 'obstacle').refreshBody();
    }

    drawItems() {
        this.itemInfoText.text = `key: ${this.player.getItems().length}`;
    }

    create() {
        this.itemInfoText = this.add.text(16, 10, 'key: 0', { fontSize: '32px', fill: '#fff' });

        this.createStatics();

        // player
        this.player = new Player(this, 70, 100, 'player', 0);
        this.physics.add.collider(this.player, this.obstacles);
    }

    update() {
        
        this.drawItems();
    }
}