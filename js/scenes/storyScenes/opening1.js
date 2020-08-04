class Opening1 extends Phaser.Scene {
    constructor () {
        super({
            key: 'opening1'
        });
    }

    create() {
        const storyText = 'On that day, the rain was pretty heavy...\n\n\nFiona had no choice but to enter the place of evils.\n\n\n\nFor some reason, they served a food.';
        this.add.text(WIDTH * 0.5, HEIGHT * 0.4, storyText, {
            fontFamily: FONTS.PRESS_START_2P,
            fontSize: '16px',
            color: '#fff',
            align: 'center',
            wordWrap: { width: WIDTH, useAdvancedWrap: true }
        }).setOrigin(0.5, 0.5);

        // insert picture of Fiona found food on trap

        this.input.on('pointerup', () => {
            this.scene.start('opening2');
        });
    }
}