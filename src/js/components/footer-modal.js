import refs from './refs';
import { scrollToHeader } from './scrollup';
const closeBackdrop = document.querySelector('.backdrop');
const theme = document.querySelector('.theme-switch');

export const onFooterLink = function (e) {
    console.log('клик по ссылку в футере');
    console.log(theme);
    refs.footerModal.classList.toggle('is-hidden');
    theme.classList.add('no-display');
    // closeBackdrop.classList.toggle('is-hidden');
    scrollToHeader();
};

