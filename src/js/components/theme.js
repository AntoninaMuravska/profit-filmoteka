import refs from './refs';

const { body:bodyRef, themeSwitcher:themeSwitcherRef,modal:modalRef } = refs;
const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};



/* Функция замены идентификатора активной темы в localStorage */
const replaceLocalStorageThemeEntry = (oldTheme, newTheme) => {
    localStorage.removeItem('Theme', oldTheme);
    localStorage.setItem('Theme', newTheme);
};



/* Функция применения темы при запуске страницы */
export const applyTheme = () => {
    const selectedTheme = localStorage.getItem('Theme');
    
    switch (selectedTheme) {
        case 'LIGHT':
            themeSwitcherRef.checked = false;
            bodyRef.classList.add(Theme.LIGHT);
            modalRef.firstElementChild.classList.add(Theme.LIGHT);
            break;

        case 'DARK':
            themeSwitcherRef.checked = true;
            bodyRef.classList.add(Theme.DARK);
            modalRef.firstElementChild.classList.add(Theme.DARK);
            break;

        default:
            themeSwitcherRef.checked = false;
            bodyRef.classList.add(Theme.LIGHT);
            modalRef.firstElementChild.classList.add(Theme.LIGHT);
            localStorage.setItem('Theme', 'LIGHT');
    }
};



/* Функция смены темы */
export const onChangeThemeSwitcherClick = () => {
    if (themeSwitcherRef.checked) {
        bodyRef.classList.replace(Theme.LIGHT, Theme.DARK);
        modalRef.firstElementChild.classList.replace(Theme.LIGHT, Theme.DARK);
        replaceLocalStorageThemeEntry('LIGHT','DARK');
    } else {
        bodyRef.classList.replace(Theme.DARK, Theme.LIGHT);
        modalRef.firstElementChild.classList.replace(Theme.DARK, Theme.LIGHT);
        replaceLocalStorageThemeEntry('DARK','LIGHT');
    }
};