import refs from './refs';
import { scrollToHeader } from './scrollup';
const closeBackdrop = document.querySelector('.footer-backdrop');
const theme = document.querySelector('.theme-switch');

export const closeOpenFooterModal = function (e) {
  refs.footerModal.classList.toggle('is-hidden');
  theme.classList.toggle('no-display');
  closeBackdrop.classList.toggle('is-hidden');
};

