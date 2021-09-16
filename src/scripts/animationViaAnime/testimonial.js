import utils from '../utility';

const { $$, $, anime} = utils;

const cardAnimationObj = {
    targets: '.top-card',
    top: ['10rem', '0rem'],
    left: window.innerWidth > 770 ? ['30%', '25%'] : 0,
    easing: 'easeInSine',
    duration: 1000
}

const animation = {
    topCardFadeOut: {
        targets: '.top-card',
        translateX: -20,
        opacity: 0,
        easing: 'easeInSine',
        duration: 500
    }
}

// select testimonial card controllers svg and path
const svg = $$('.card-controller > svg');
const previousArrowIcon = $('#previous');
const nextArrowIcon = $('#next');
const testimonials = $$('.testimonial__right--card > *');
const testimonialIndicators = $$('.testimonial__left-slideIndicator > *');

let i = 0;
let previousCard = null;
let presentCard = testimonials[i];
let nextCard = testimonials[i + 1];

const indicatorController = index => {
    testimonialIndicators.forEach(indicator => {
        indicator.classList.remove('active-testimonial');
    })

    testimonialIndicators[index].classList.add('active-testimonial');
}

const cardController = e => {
    const idName = e.target.id;
    
    if (idName === 'next' && nextCard) {
        previousCard = presentCard;
        presentCard = nextCard;
    
        nextCard = testimonials[i < testimonials.length ? ++i + 1 : i];

        // set active arrow class to the previous icon
        previousArrowIcon.firstElementChild.classList.add('active-arrow');

        // switch the active dot
        indicatorController(i);
        anime(animation.topCardFadeOut);
    }

    if (idName === 'previous' && previousCard) {
        nextCard = presentCard;
        presentCard = previousCard;

        i && i--;
        previousCard = testimonials[i === 0 ? -1 : i + 1];

        // set active arrow class to the next icon
        nextArrowIcon.firstElementChild.classList.add('active-arrow');

        // switch the active dot
        indicatorController(i);
    }

    if (!nextCard) {
        nextArrowIcon.firstElementChild.classList.remove('active-arrow');
    }

    if (!previousCard) {
        previousArrowIcon.firstElementChild.classList.remove('active-arrow');
    }
}

svg.forEach(arrow => {
    arrow.addEventListener('click', cardController);
})