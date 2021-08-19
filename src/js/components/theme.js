import refs from './refs';

const { body:bodyRef, themeSwitcher:themeSwitcherRef,modal:modalRef, footerModal:footerModal } = refs;
const Theme = {
    LIGHT: 'light-theme',
    DARK: 'dark-theme',
};
var teamCard = document.querySelectorAll('.team-member');

console.log(teamCard);
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
            footerModal.classList.add(Theme.LIGHT);
            classListAddToMassive(teamCard, Theme.LIGHT);
            // teamCard.classList.add(Theme.LIGHT);
            // teamCard.forEach(card => card.classList.add(Theme.LIGHT));
            break; 

        case 'DARK':
            themeSwitcherRef.checked = true;
            bodyRef.classList.add(Theme.DARK);
            modalRef.firstElementChild.classList.add(Theme.DARK);
            footerModal.classList.add(Theme.DARK);
            classListAddToMassive(teamCard, Theme.DARK);
            break;

        default:
            themeSwitcherRef.checked = false;
            bodyRef.classList.add(Theme.LIGHT);
            modalRef.firstElementChild.classList.add(Theme.LIGHT);
            footerModal.classList.add(Theme.LIGHT);
            classListAddToMassive(teamCard, Theme.LIGHT);
            localStorage.setItem('Theme', 'LIGHT');
    }
};



/* Функция смены темы */
export const onChangeThemeSwitcherClick = () => {
    if (themeSwitcherRef.checked) {
        bodyRef.classList.replace(Theme.LIGHT, Theme.DARK);
        modalRef.firstElementChild.classList.replace(Theme.LIGHT, Theme.DARK);
        footerModal.classList.replace(Theme.LIGHT, Theme.DARK);
        classListChangeToMassive(teamCard, Theme.LIGHT, Theme.DARK);
        replaceLocalStorageThemeEntry('LIGHT','DARK');
    } else {
        bodyRef.classList.replace(Theme.DARK, Theme.LIGHT);
        modalRef.firstElementChild.classList.replace(Theme.DARK, Theme.LIGHT);
        footerModal.classList.replace(Theme.DARK, Theme.LIGHT);
        classListChangeToMassive(teamCard, Theme.DARK, Theme.LIGHT);
        replaceLocalStorageThemeEntry('DARK','LIGHT');
    }
};


/* Функция для скрытия/показа переключателя темы*/
export const themeSwitcherToggle = () => {
    const switchControlRef = document.querySelector('.theme-switch');
    switchControlRef.classList.toggle('visually-hidden');
};

//Функция перебора массива одинаковых элемонтов 
const classListAddToMassive = (massive, theme) => {
    for (var i = 0; i < massive.length; i++){
        massive[i].classList.add(theme);
    }
};

const classListChangeToMassive = (massive, theme1, theme2) => {
    for (var i = 0; i < massive.length; i++){
        massive[i].classList.replace(theme1, theme2);
    }
};