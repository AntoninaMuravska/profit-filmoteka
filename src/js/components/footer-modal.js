import refs from './refs';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

const closeBackdrop = document.querySelector('.footer-backdrop');
const theme = document.querySelector('.theme-switch');


export const closeOpenFooterModal = function () {
  refs.footerModal.classList.toggle('is-hidden');
  theme.classList.toggle('no-display');
  closeBackdrop.classList.toggle('is-hidden');
  const isClosing = refs.footerModal.classList.contains('is-hidden');
  if (isClosing) {
    enableBodyScroll(document.body);
  } else {
    disableBodyScroll(document.body);
  }
};

