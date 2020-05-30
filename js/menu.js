class Menu extends Phaser.Scene {
    constructor() {
        super({
            key: 'menu'
        });
    }

    create() {
        this.add.sprite(WIDTH * 0.5, HEIGHT * 0.35, 'sprites', 'phaser3')
        this.addButton(WIDTH * 0.5, HEIGHT * 0.7, 'sprites', this.doStart, this, 'btn_play_hl', 'btn_play');
        console.log('main menu');
    }
    
    doStart() {
        console.log('do start was called');
        this.scene.start('prototypeStage');
    }
}