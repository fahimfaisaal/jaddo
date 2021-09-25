import utils from '../utility';
import colors from './destinationSpring';

const { $$, anime, anime: { setDashoffset, random, stagger } } = utils;

const [leftSpringPath, rightSpringPath] = [
    $$('.subscription__spring--left svg path'),
    $$('.subscription__spring--right svg path'),
]

const animation = {
    rightSpring: {
        targets: rightSpringPath,
        strokeDashoffset: [setDashoffset, 0],
        easing: 'easeInSine',
        duration: 1500,
        delay: stagger(300),
        direction: 'alternate',
    },
    leftSpring: {
        targets: leftSpringPath,
        strokeDashoffset: [setDashoffset, 0],
        easing: 'easeInSine',
        duration: 2500,
        delay: stagger(300),
        direction: 'alternate',
    }
}

const springAnime = (actionObj) => {
    const { targets } = actionObj;

    targets.forEach(t => {
        t.style.stroke = `${colors[random(0, colors.length - 1)]}`;
    })

    actionObj.complete = () => springAnime(actionObj);
    anime(actionObj);
}

springAnime(animation.rightSpring);
springAnime(animation.leftSpring);
