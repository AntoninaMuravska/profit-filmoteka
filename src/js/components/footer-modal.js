import refs from './refs';
import { scrollToHeader } from './scrollup';
const closeBackdrop = document.querySelector('.footer-backdrop');
const theme = document.querySelector('.theme-switch');
const closeFooterModal = document.querySelector('.close');
import { scrollupBtnChangeVisibility } from './scrollup';
import { themeSwitcherToggle } from './theme';

export const closeOpenFooterModal = function (e) {
    themeSwitcherToggle();
    refs.footerModal.classList.toggle('is-hidden');
    theme.classList.toggle('no-display');
    closeBackdrop.classList.toggle('is-hidden');
    scrollupBtnChangeVisibility();
};
closeFooterModal.addEventListener('click', closeOpenFooterModal);


