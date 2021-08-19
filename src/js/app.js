import refs from './components/refs';
import { onGalleryItemClick, fetchGenres } from './components/gallery';
import { applyTheme, onChangeThemeSwitcherClick } from './components/theme';
import { scrollUpInit } from './components/scrollup';
import { onHomeBtnClick, onLibraryBtnClick } from './components/header';
import { closeOpenFooterModal } from './components/footer-modal';

refs.gallery.addEventListener('click', onGalleryItemClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);
refs.libraryBtn.addEventListener('click', onLibraryBtnClick);
refs.themeSwitcher.addEventListener('change', onChangeThemeSwitcherClick);
refs.closeFooter.addEventListener('click', closeOpenFooterModal);
refs.footerLink.addEventListener('click', closeOpenFooterModal);

document.addEventListener('DOMContentLoaded', applyTheme);
window.addEventListener('load', () => {
  setTimeout(fetchGenres,0);
  setTimeout(() => {
    refs.homeBtn.click();
    scrollUpInit();
  }, 50);
});
