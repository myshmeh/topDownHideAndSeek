class Map extends Phaser.Scene {
    constructor() {
        super ({key: 'map'});
    }

    init(data) {
        this.stageName = data.stageName;
        this.stageProps = data.stageProps;
    }

    create() {
        const wNum = WIDTH / 32;
        const hNum = HEIGHT / 32;
        for (let i = 0; i < wNum; i++)
            for (let j = 0; j < hNum; j++)
                this.add.image(i * 32, j * 32, 'wood_floor', 0);
        for (let i = wNum * 0.6; i < wNum; i++)
            for (let j = hNum * 0.7; j < hNum; j++)
                this.add.image(i * 32 + 9, j * 32, 'tatami_floor', 0);
        this.add.image(WIDTH * 0.5, HEIGHT * 0.5, 'map', 0).setScale(5.1);
        this.add.image(ROACH_POS_ON_MAP[this.stageName].x, ROACH_POS_ON_MAP[this.stageName].y, 'roach_idle', 0).setScale(1.5);
        this.add.image(FIONA_POS_ON_MAP.x, FIONA_POS_ON_MAP.y, 'trap', 0).setScale(2);
        this.add.image(FIONA_POS_ON_MAP.x, FIONA_POS_ON_MAP.y, 'fiona_idle', 10).setScale(1.5);
        this.add.text(LABEL_POS_ON_MAP.stage2.x, LABEL_POS_ON_MAP.stage2.y, 'BED ROOM', {fontSize: '11px', fontFamily: FONTS.PRESS_START_2P}).setOrigin(0.5);
        this.add.text(LABEL_POS_ON_MAP.stage3.x, LABEL_POS_ON_MAP.stage3.y, 'KIDS ROOM', {fontSize: '11px', fontFamily: FONTS.PRESS_START_2P}).setOrigin(0.5);
        this.add.text(LABEL_POS_ON_MAP.stage4.x, LABEL_POS_ON_MAP.stage4.y, 'WASHITSU', {fontSize: '11px', fontFamily: FONTS.PRESS_START_2P}).setOrigin(0.5);
        this.add.text(LABEL_POS_ON_MAP.stage5.x, LABEL_POS_ON_MAP.stage5.y, 'LIVING ROOM', {fontSize: '11px', fontFamily: FONTS.PRESS_START_2P}).setOrigin(0.5);
        this.add.text(LABEL_POS_ON_MAP.stage6.x, LABEL_POS_ON_MAP.stage6.y, 'KITCHEN', {fontSize: '11px', fontFamily: FONTS.PRESS_START_2P}).setOrigin(0.5);
        this.time.delayedCall(3000, () => this.scene.start(this.stageName, {items: this.stageProps}));
    }
}