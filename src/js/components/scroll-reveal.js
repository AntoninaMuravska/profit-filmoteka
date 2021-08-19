import ScrollReveal from 'scrollreveal';

export const scrollReveal = (className='.film-card___container') => {
  var slideUp = {
    distance: '15%',
    origin: 'bottom',
    opacity: null
  };
  ScrollReveal().reveal(className, slideUp);
};