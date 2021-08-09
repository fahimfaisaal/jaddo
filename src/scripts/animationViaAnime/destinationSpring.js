import util from '../utility';

const { anime } = util;

const { setDashoffset, random } = anime;

const springAnimation = () => {
    const animationObj = {
        targets: '.destination_spring > svg path',
        strokeDashoffset: [setDashoffset, 0],
        easing: 'easeInQuad',
        duration: random(1000, 2500),
        direction: 'alternate',
        complete: springAnimation
    }

    anime(animationObj);
}

springAnimation();