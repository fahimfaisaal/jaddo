//* node modules
import anime from 'animejs/lib/anime.es.js';
// relative modules
import utils from './utility';

const { mergeAnimeTimelines, mousePosition, addToAnime, $ } = utils;
const { timeline, stagger } = anime;

const h1WrapperAnimation = {
    targets: '.decore-wrapper',
    delay: 1000,
    scaleX: [1, 0],
    easing: 'easeOutCubic',
    duration: 1500
}

anime(h1WrapperAnimation)
