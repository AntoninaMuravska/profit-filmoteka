import refs from './components/refs';
import {
  onGalleryItemClick,
  makeGalleryFromThrendesFilms,
  makeGalleryFromSearchedFilms,
  fetchGenres,
} from './components/gallery';
import { applyTheme, onChangeThemeSwitcherClick } from './components/theme';
import { scrollUpInit } from './components/scrollup';
import { onHomeBtnClick, onLibraryBtnClick } from './components/header';

refs.gallery.addEventListener('click', onGalleryItemClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);
refs.libraryBtn.addEventListener('click', onLibraryBtnClick);
refs.themeSwitcher.addEventListener('change', onChangeThemeSwitcherClick);
refs.headerForm.addEventListener('submit', makeGalleryFromSearchedFilms);

document.addEventListener('DOMContentLoaded', applyTheme);
window.addEventListener('load', async e => {
  setTimeout(fetchGenres,0);
  setTimeout(makeGalleryFromThrendesFilms,150,e);
  setTimeout(scrollUpInit,250);
});

