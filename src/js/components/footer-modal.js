import refs from './refs';
import { scrollToHeader } from './scrollup';
const footerBackdrop = document.querySelector('.footer-backdrop');
const theme = document.querySelector('.theme-switch');
const footerModal = document.querySelector('.footer_modal');

// refs.body.addEventListener('click', onBodyClickToCloseModal);
// function onBodyClickToCloseModal(e) {
//     if (!e.target.classList.contains('footer-backdrop') || !e.target.classList.contains('footer_modal')) {
//         closeOpenFooterModal();
//     }
//     return;
// }
export const closeOpenFooterModal = function (e) {
    console.log('клик по ссылку в футере');
    console.log(footerBackdrop);
    console.log(footerModal);
    footerBackdrop.classList.toggle('is-hidden');
    footerModal.classList.toggle('is-hidden');
    theme.classList.add('no-display');
    scrollToHeader();
};

