class Map extends Phaser.Scene {
    constructor() {
        super ({key: 'map'});
    }

    init(data) {
        this.stageName = data.stageName;
        this.stageProps = data.stageProps;
    }

    create() {
        // const rect = this.add.rectangle(0, 0, WIDTH, HEIGHT, 0x000000).setOrigin(0);
        // this.tweens.add({ targets: rect, duration: 500, alpha: 0, delay: 500 });
        // this.tweens.add({ targets: rect, duration: 500, alpha: 1, delay: 500, delay: 2000 });
        this.add.image(WIDTH * 0.5, HEIGHT * 0.5, 'map', 0).setScale(6);
        this.add.image(ROACH_POS_ON_MAP[this.stageName].x, ROACH_POS_ON_MAP[this.stageName].y, 'roach_idle', 0).setScale(2.5);
        this.add.text(LABEL_POS_ON_MAP.stage2.x, LABEL_POS_ON_MAP.stage2.y, 'KIDS ROOM', {fontSize: '11px', fontFamily: FONTS.PRESS_START_2P}).setOrigin(0.5);
        this.add.text(LABEL_POS_ON_MAP.stage3.x, LABEL_POS_ON_MAP.stage3.y, 'KIDS ROOM2', {fontSize: '11px', fontFamily: FONTS.PRESS_START_2P}).setOrigin(0.5);
        this.add.text(LABEL_POS_ON_MAP.stage4.x, LABEL_POS_ON_MAP.stage4.y, 'WASHITSU', {fontSize: '11px', fontFamily: FONTS.PRESS_START_2P}).setOrigin(0.5);
        this.add.text(LABEL_POS_ON_MAP.stage5.x, LABEL_POS_ON_MAP.stage5.y, 'LIVING ROOM', {fontSize: '11px', fontFamily: FONTS.PRESS_START_2P}).setOrigin(0.5);
        this.add.text(LABEL_POS_ON_MAP.stage6.x, LABEL_POS_ON_MAP.stage6.y, 'KITCHEN', {fontSize: '11px', fontFamily: FONTS.PRESS_START_2P}).setOrigin(0.5);
        this.time.delayedCall(3000, () => this.scene.start(this.stageName, {items: this.stageProps}));
    }
}