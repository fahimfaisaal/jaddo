import utils from '../utility';

const { $$, $, anime: { timeline } } = utils;

/**
 * anime js animation object function
 * @param {object} target 
 * @param {function} callback 
 * @returns {object}
 */
const animation = (target, callback) => (
    {
        next: {
            topCardFadeOut: {
                targets: target,
                translateX: '-2rem',
                opacity: 0,
                duration: 500
            },
            nextCardPopup: {
                targets: target,
                top: ['10rem', '0rem'],
                left: window.innerWidth > 770 ? ['30%', '25%'] : 0,
                duration: 500,
                complete: callback
            },
        },
        previous: {
            presentCardPopDown: {
                targets: target,
                top: ['0rem', '10rem'],
                left: window.innerWidth > 770 ? ['25%', '30%'] : 0,
                translateX: '0rem',
                duration: 500,
                begin: callback
            },
            previousCardFadeIn: {
                targets: target,
                translateX: window.innerWidth > 770 ? '2rem' : '0rem',
                opacity: 1,
                duration: 500,
            },
        }
    }
)

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

const removeTopCard = targetNode => {
    testimonials.forEach(testimonial => testimonial.classList.remove('top-card'));

    targetNode.classList.add('top-card');
}

const cardController = e => {
    const idName = e.target.id;
    
    if (idName === 'next' && nextCard) {
        const tl = timeline({ easing: 'easeInOutQuad' });
        
        // next card animation
        tl.add(animation(testimonials[i]).next.topCardFadeOut)
            .add(
                animation(
                    testimonials[i + 1],
                    () => removeTopCard(testimonials[i])
                ).next.nextCardPopup
            );

        previousCard = presentCard;
        presentCard = nextCard;
    
        nextCard = testimonials[i < testimonials.length ? ++i + 1 : i];

        // set active arrow class to the previous icon
        previousArrowIcon.firstElementChild.classList.add('active-arrow');

        // switch the active dot
        indicatorController(i);
    }

    if (idName === 'previous' && previousCard) {
        const tl = timeline();

        // previous card animation
        tl.add(
            animation(
                    testimonials[i],
                    () => removeTopCard(testimonials[i])
                ).previous.presentCardPopDown
            )
            .add(
                animation(testimonials[i - 1]).previous.previousCardFadeIn
            );
        
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