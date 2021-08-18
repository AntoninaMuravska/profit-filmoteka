import refs from './components/refs';
import {
  onGalleryItemClick,
  makeGalleryFromFilmsByCathegory,
  makeGalleryFromSearchedFilms,
  fetchGenres,
} from './components/gallery';
import { applyTheme, onChangeThemeSwitcherClick } from './components/theme';
import { scrollUpInit } from './components/scrollup';
import { onHomeBtnClick, onLibraryBtnClick } from './components/header';
import { onFooterLink } from './components/footer-modal';

refs.gallery.addEventListener('click', onGalleryItemClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);
refs.libraryBtn.addEventListener('click', onLibraryBtnClick);
refs.themeSwitcher.addEventListener('change', onChangeThemeSwitcherClick);
refs.headerForm.addEventListener('submit', makeGalleryFromSearchedFilms);
refs.closeFooter.addEventListener('click', onFooterLink);
refs.footerLink.addEventListener('click', onFooterLink);

document.addEventListener('DOMContentLoaded', applyTheme);
window.addEventListener('load', async e => {
  setTimeout(fetchGenres,0);
  setTimeout(makeGalleryFromFilmsByCathegory,150,e);
  setTimeout(scrollUpInit,250);
});
