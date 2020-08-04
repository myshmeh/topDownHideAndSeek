class Opening2 extends Phaser.Scene {
    constructor () {
        super({
            key: 'opening2'
        });
    }

    create() {
        const storyText = 'Once she started eating it,\n\nshe realized it was a dirty trap.\n\n\nShe can\'t move at all!';
        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, storyText, {
            fontFamily: FONTS.PRESS_START_2P,
            fontSize: '16px',
            color: '#fff',
            align: 'center',
            wordWrap: { width: WIDTH, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);

        // TODO: insert picture of Fiona trapped

        this.input.on('pointerup', () => {
            this.scene.start('opening3');
        });
    }

    update() {

    }
}