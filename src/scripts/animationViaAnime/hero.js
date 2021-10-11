//* node modules
import util from '../utility';
const { anime } = util;

const h1WrapperAnimation = {
    targets: '.decore-wrapper',
    delay: 1000,
    scaleX: [1, 0],
    easing: 'easeOutCubic',
    duration: 1500
}

anime(h1WrapperAnimation);