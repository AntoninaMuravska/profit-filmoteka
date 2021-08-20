import refs from './refs';
import { enableBodyScroll, disableBodyScroll } from 'body-scroll-lock';

const closeBackdrop = document.querySelector('.footer-backdrop');
const theme = document.querySelector('.theme-switch');

export const closeOpenFooterModal = function (e) {
  refs.footerModal.classList.toggle('is-hidden');
  theme.classList.toggle('no-display');
  closeBackdrop.classList.toggle('is-hidden');
  const isClosing = refs.footerModal.classList.contains('is-hidden');
  if (isClosing) {
    enableBodyScroll(document.body);
    window.removeEventListener('keydown', onPressEscape);
  } else {
    disableBodyScroll(document.body);
    window.addEventListener('keydown', onPressEscape);
  }
};

function onPressEscape(e) {
  if (e.code === 'Escape') {
    closeModal();
  }
}

refs.footerBackdrop.addEventListener('click', onBackdropClick);

function onBackdropClick(e) {
  if (e.target === e.currentTarget) {
    closeModal();
  }
}

function closeModal() {
  enableBodyScroll(document.body);
  refs.footerModal.classList.add('is-hidden');
  theme.classList.add('no-display');
  closeBackdrop.classList.add('is-hidden');
}
