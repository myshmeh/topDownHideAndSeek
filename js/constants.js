const WIDTH = 375;
const HEIGHT = 667;
const BORDER_THICKNESS = 16;
const ITEM_BAR_HEIGHT = 50;

const FONTS = {
    PRESS_START_2P: '"Press Start 2P"',
    RIGHTEOUS: 'Righteous',
};
Object.freeze(FONTS);

const PLAYER_ACC = 100;
const PLAYER_ANIM_MOVE_MS_PER_FRAME_MIN = 50;
const PLAYER_ANIM_MOVE_MS_PER_FRAME_MAX = 180;

const PLOTS = [
    'That day, the rain was pretty heavy...\n\n\nFiona had no choice but to enter the place of evils.\n\n\n\nFor some reason, they served a food.',
    'Once she started eating it,\n\nshe realized it was a dirty trap.\n\n\nShe can\'t move at all!',
    'SAVE FIONA!!',
];

const ROACH_POS_ON_MAP = {
    stage2: {x: WIDTH * 0.75, y: HEIGHT * 0.2},
    stage3: {x: WIDTH * 0.75, y: HEIGHT * 0.5},
    stage4: {x: WIDTH * 0.75, y: HEIGHT * 0.8},
    stage5: {x: WIDTH * 0.35, y: HEIGHT * 0.8},
    stage6: {x: WIDTH * 0.225, y: HEIGHT * 0.55},
}

const LABEL_POS_ON_MAP = {
    stage2: {x: WIDTH * 0.775, y: HEIGHT * 0.1},
    stage3: {x: WIDTH * 0.775, y: HEIGHT * 0.4},
    stage4: {x: WIDTH * 0.775, y: HEIGHT * 0.7},
    stage5: {x: WIDTH * 0.35, y: HEIGHT * 0.7},
    stage6: {x: WIDTH * 0.225, y: HEIGHT * 0.45},
}