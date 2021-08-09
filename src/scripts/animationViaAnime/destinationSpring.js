import util from '../utility';

const { anime, $ } = util;

const { setDashoffset, random } = anime;

const colors = ['#212832', '#df6951', '#f1a501', '#5e6282'];
const target = $('.destination_spring > svg path');

const springAnimation = () => {
    const selectedColor = colors[random(0, colors.length - 1)];

    const animationObj = {
        targets: target,
        strokeDashoffset: [setDashoffset, 0],
        easing: 'easeInQuad',
        duration: random(1000, 2500),
        direction: 'alternate',
        complete: () => {
            target.style.stroke = selectedColor;
            springAnimation();
        }
    }

    anime(animationObj);
}

springAnimation();