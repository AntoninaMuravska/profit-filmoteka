import { addBackToTop } from 'vanilla-back-to-top';

export const scrollUpInit = () => {
    const settings = {
        diameter: 56,
        backgroundColor: '#ff6b01',
        textColor: '#fff',
        scrollDuration: 400, // ms
        showWhenScrollTopIs: 500, // px
    };

    addBackToTop(settings);
};

export const scrollupBtnChangeVisibility = () => {
    const scrollupBtnRef = document.querySelector('#back-to-top');
    scrollupBtnRef.classList.toggle('visually-hidden');
};

export const scrollToHeader = () => {
    window.scroll({
        top: 1,
        behavior: 'smooth',
    });
};