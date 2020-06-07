class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'menu'
        });
    }

    create() {
        this.add.sprite(WIDTH * 0.5, HEIGHT * 0.35, 'sprites', 'phaser3').setScale(0.5, 0.5)
        this.addButton(WIDTH * 0.5, HEIGHT * 0.6, 'sprites', this.doStart, this, 'btn_play_hl', 'btn_play').setScale(0.8, 0.8);
        console.log('main menu');
    }
    
    doStart() {
        console.log('do start was called');
        this.scene.start('stage1');
    }
}