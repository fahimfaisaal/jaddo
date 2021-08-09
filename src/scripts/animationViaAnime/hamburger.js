// relative modules
import utils from '../utility';

const {
    mergeAnimeTimelines,
    mousePosition,
    addToAnime,
    $,
    anime: { timeline, stagger }
} = utils;

const hamburger = $('#hamburger');
let isOpenHamburger = false;

const hamburgerAnimation = (e) => {
    const x = mousePosition(e);
    const y = mousePosition(e, 'y');

    const hamburgerProps = {
        line2: {
            targets: '#line2',
            scaleX: !isOpenHamburger ? 0 : 1,
            easing: 'easeInExpo',
            duration: 300,
            offset: isOpenHamburger ? '-=1500' : null
        },
        line1: {
            targets: '#line1',
            translateY: !isOpenHamburger ? 12 : 0,
            easing: 'easeInExpo',
            duration: 300,
            offset: !isOpenHamburger ? '-=250' : null,
        },
        line3: {
            targets: '#line3',
            translateY: !isOpenHamburger ? -10 : 0,
            easing: 'easeInExpo',
            duration: 300,
            offset: !isOpenHamburger ? '-=250' : null,
            complete: () => {
                // toggle hacks
                const line3 = $('#line3')
                const body = $('body');

                line3.style.stroke = isOpenHamburger ? '#DF6951' : '#212832';
                body.style.overflow = isOpenHamburger ? 'hidden' : 'initial';
            }
        },
        clip: {
            targets: '.menu-list-bg',
            easing: 'easeInSine',
            keyframes: [
                { clipPath: `circle(${!isOpenHamburger ? 0 : 115}% at ${x}% ${y}%)` },
                { clipPath: `circle(${isOpenHamburger ? 0 : 115}% at ${x}% ${y}%)` },
            ],
            offset: isOpenHamburger ? '-=2000' : null
        },
        list: {
            targets: '.menu-list > li',
            translateX: !isOpenHamburger ? [30, 0] : [0, 30],
            opacity: !isOpenHamburger ? [0, 1] : [1, 0],
            delay: stagger(50, {direction: !isOpenHamburger ? 'start' : 'reverse'}),
            easing: 'spring(1, 80, 10, 0)',
            offset: !isOpenHamburger ? '-=400' : null
        }
    }
    
    const hamburgerTimeline = timeline();
    const animePropsArr = Object.values(hamburgerProps);

    mergeAnimeTimelines(hamburgerTimeline, !isOpenHamburger ? animePropsArr : animePropsArr.reverse());

    isOpenHamburger = isOpenHamburger ? false : true;

    //  pointer events controller
    const menu = $('.mobile__menu-list');
    const menuBg = $('.menu-list-bg')

    if (isOpenHamburger) {
        [menuBg, menu].forEach(item => {
            item.classList.add('is-pointer-events')
        })

        return
    }

    [menuBg, menu].forEach(item => {
        item.classList.remove('is-pointer-events')
    })
}

hamburger.addEventListener('click', hamburgerAnimation);

const lines = ['#line1', '#line2', '#line3'];
const animations = {
    intro: {
        targets: lines,
        scaleX: [0, 1],
        duration: 400,
        easing: 'easeInSine',
        delay: stagger(100)
    }
}

const animationsArr = Object.values(animations);

// add all animation to anime
addToAnime(animationsArr);