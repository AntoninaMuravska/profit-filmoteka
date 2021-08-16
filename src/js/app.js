import refs from './components/refs';
import { onGalleryItemClick, makeGalleryFromLibraryItems, makeGalleryFromThrendesFilms, fetchGenres} from './components/gallery';
import { applyTheme, onChangeThemeSwitcherClick } from './components/theme';
import { scrollUpInit } from './components/scrollup';
import { onHomeBtnClick, onLibraryBtnClick } from './components/header';


refs.gallery.addEventListener('click', onGalleryItemClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);
refs.libraryBtn.addEventListener('click', onLibraryBtnClick);





refs.homeBtn.addEventListener('click', makeGalleryFromThrendesFilms);
refs.queueBtn.addEventListener('click', makeGalleryFromLibraryItems);
refs.watchedBtn.addEventListener('click', makeGalleryFromLibraryItems);
refs.themeSwitcher.addEventListener('change', onChangeThemeSwitcherClick);

document.addEventListener('DOMContentLoaded', applyTheme);
window.addEventListener('load', (e) => {
  fetchGenres();
  makeGalleryFromThrendesFilms(e);
  scrollUpInit();
});