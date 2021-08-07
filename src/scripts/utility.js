//* node modules
import anime from 'animejs/lib/anime.es.js';

// module scaffolding
const utility = {};

/**
 * select one element
 * @param {string} element 
 * @returns {dom node}
 */
utility.$ = element => document.querySelector(element);

/**
 * select all elements
 * @param {string} element
 * @returns {array}
 */
utility.$$ = element => [...document.querySelectorAll(element)];

/**
 * merge all animation to the timeline one by one
 * @param {object} timeline 
 * @param {array} animations
 * @returns {object}
 */
utility.mergeAnimeTimelines = (timeline, [...animations]) => {
    console.log(JSON.stringify(animations, null, 2))
    while (animations.length) {
        const properties = animations.shift();
        const { offset } = properties;

        timeline.add(properties, offset);
    }

    return timeline;
}

/**
 * add animation one by one to anime function
 * @param {array} animations
 */
utility.addToAnime = ([...animations]) => {
    const allAnimations = [];

    while (animations.length) {
        allAnimations.push(
            anime(animations.shift())
        );
    }

    return allAnimations;
}

/**
 * get the mouse position via axis x or y
 * @param {object} event 
 * @param {string x|y} axis 
 * @returns {string} the mouse position
 */
utility.mousePosition = (event, axis = 'x') => {
    return (
        Math.ceil(
            axis === 'x'
                ? (event.pageX * 100) / window.innerWidth
                : (event.pageY * 100) / window.innerHeight
        )
    );
}

utility.anime = anime;

export default utility;