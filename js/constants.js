const WIDTH = 375;
const HEIGHT = 667;
const BORDER_THICKNESS = 16;
const ITEM_BAR_HEIGHT = 50;

const DEPTH_MID = 50;
const DEPTH_MAX = 99;

const FONTS = {
    PRESS_START_2P: '"Press Start 2P"',
};
Object.freeze(FONTS);

const PLAYER_ACC = 100;
const PLAYER_ANIM_MOVE_MS_PER_FRAME_MIN = 50;
const PLAYER_ANIM_MOVE_MS_PER_FRAME_MAX = 180;

const PLOTS = [
    'That day, the rain was so heavy.Fiona was forced to enter the place of evils.\n\n\n\n\nFor some reason, they served a food.',
    'Well, it was a dirty trap.\n\n\nShe can\'t move at all!',
    'SAVE FIONA!',
];

const ENDING_PLOTS = [
    'You found Fiona.\n\nShe\'s struggled but still alive.',
    'Let\'s use your powders to negate their trap.',
    [
        '..No powders?\n\nThere\'s nothing you can do here..',
        'UH-OH.. Not enough powders.\n\n\nNow you\'re caught too..',
        'They worked!\n\n\nLet\'s get out of here!'
    ],
    [
        'FIONA DIES\n\nYOU LIVE',
        'REST IN PEACE\n\nTOGETHER',
        'HAPPY LIFE\n\nREGAINED'
    ]
];

const ROACH_POS_ON_MAP = {
    stage2: {x: WIDTH * 0.75, y: HEIGHT * 0.2},
    stage3: {x: WIDTH * 0.75, y: HEIGHT * 0.5},
    stage4: {x: WIDTH * 0.75, y: HEIGHT * 0.8},
    stage5: {x: WIDTH * 0.3, y: HEIGHT * 0.8},
    stage6: {x: WIDTH * 0.225, y: HEIGHT * 0.5},
}

const FIONA_POS_ON_MAP = {
    x: WIDTH * 0.32,
    y: HEIGHT * 0.58
}

const LABEL_POS_ON_MAP = {
    stage2: {x: WIDTH * 0.775, y: HEIGHT * 0.05},
    stage3: {x: WIDTH * 0.775, y: HEIGHT * 0.375},
    stage4: {x: WIDTH * 0.775, y: HEIGHT * 0.7},
    stage5: {x: WIDTH * 0.3, y: HEIGHT * 0.7},
    stage6: {x: WIDTH * 0.225, y: HEIGHT * 0.375},
}