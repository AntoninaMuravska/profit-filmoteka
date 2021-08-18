import ScrollReveal from 'scrollreveal';

// ScrollReveal (https://github.com/jlmakes/scrollreveal)

// export function scrollReveal() {
//   window.sr = ScrollReveal();
  
//   sr.reveal('.film-card___container', {
//     duration   : 600,
//     distance   : '20px',
//     easing     : 'ease-out',
//     origin     : 'bottom',
//     reset      : true,
//     scale      : 1,
//     viewFactor : 0,
//     afterReveal  : revealChildren,
//   }, 150);
  
//     var revealChildren = sr.reveal('.title, .film-box', {
//     duration   : 500,
//     scale      : 1,
//     distance   : '20px',
//     origin     : 'bottom',
//     reset      : true,
//     easing     : 'ease-out',
//     viewFactor : 1,
//   }, 75);
// };

export const scrollReveal = (className='.film-card___container') => {
  var slideUp = {
    distance: '15%',
    origin: 'bottom',
    opacity: null
  };
  ScrollReveal().reveal(className, slideUp);
};