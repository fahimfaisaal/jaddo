// relative modules
import utils from '../utility';

const { anime, $$, $ } = utils;

const common = {
    autoplay: false,
    easing: "easeInOutQuad",
    duration: 1000,
    direction: "alternate",
    loop: true
};

// this obj keys name are same to icon svg class name. for accessing the exact animation
const iconAnimations = {
    calculatedWeather: anime({
        targets: "#antina",
        rotate: [-10, 20],
        ...common,
        duration: 2000,
        easing: "linear"
    }),
    bestFlights: anime({
        targets: "#plane",
        translateY: [-10, 0],
        ...common
    }),
    localEvents: [
        anime({
            targets: "#localTop",
            translateY: [-10, 0],
            ...common
        }),
        anime({
            targets: "#localBottom",
            scale: [0.5, 1],
            ...common
        })
    ],
    customization: anime({
        targets: "#setting",
        rotate: [0, 360 * 2 - 45],
        ...common,
        easing: 'spring(1, 80, 10, 0)',
        duration: 1500,
    })
};

const allCategoryCard = $$('.category__card > *');

/**
 * get the animation by target event
 * @param {object} e - the DOM event object expected
 * @returns {undefined}
 */
const getAnimationById = e => {
    const selectedCategory = $(`.${e.target.getAttribute('class')} > svg`);
    const svgId = selectedCategory.getAttribute('id');

    return iconAnimations[svgId];
}

/**
 * control the animation
 * @param {object} e - the DOM event object expected
 * @callback callbackAction 
 * @param {object} animation - animeJs animation object
 * @returns {undefined}
 */
const animationController = (e, callbackAction) => {
    const animation = getAnimationById(e);

    if (Array.isArray(animation)) {
        return animation.forEach(eachAnime => callbackAction(eachAnime));
    }

    callbackAction(animation);
}

// traverse the 4 category card one by one
allCategoryCard.forEach(card => {
    // play the animation on mouse enter
    card.addEventListener('mouseenter',
        e => animationController(
            e,
            animation => animation.play()
        )
    );

    // pause the animation on mouse leave
    card.addEventListener(
        'mouseleave',
        e => animationController(
            e,
            animation => animation.pause()
        )
    );
})