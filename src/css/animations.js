import { keyframes } from 'styled-components'

export const animateBackground = keyframes`
    0%{
      background-position: 50% 0%;
    }
    50%{
      background-position: 51% 100%;
    }
    100%{
      background-position:50% 0%;
    }
`

/*
* https://css-tricks.com/snippets/css/shake-css-keyframe-animation/
*/
export const animateShake = keyframes`
  10%, 90% {
    transform: translate3d(-1px, 0, 0) rotate(5deg);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-2px, 0, 0) rotate(-5deg);
  }

  40%, 60% {
    transform: translate3d(2px, 0, 0);
  }
`

export const fadeInBottom = keyframes`
  to {
    transform: translateY(0);
    opacity: 1;
  }
`
