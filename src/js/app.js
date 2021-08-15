import refs from './components/refs';
import { onGalleryItemClick, renderLibrary, createMarkupHome } from './components/gallery';
import { getLibraryItems } from './components/library-app';
import genresTransformation from './components/genre-transformator';
import { getGenres } from './components/session-storage';
import { clearMarkup } from './components/render-markup';
import { applyTheme, onChangeThemeSwitcherClick } from './components/theme';
import { scrollUpInit } from './components/scrollup';
import { onHomeBtnClick, onLibraryBtnClick } from './components/header';
import { paginationInit } from './components/pagination';

refs.gallery.addEventListener('click', onGalleryItemClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);
refs.libraryBtn.addEventListener('click', onLibraryBtnClick);


/*
 * Функция формирования галлереи фильмов из библиотеки
 */
const makeGalleryFromLibraryItems = e => {
  const data = getLibraryItems(e);
  const genres = getGenres();

  clearMarkup(refs.gallery);

  if (data) {
    const paginationLibraryWatched = paginationInit(data.total_results);

    paginationLibraryWatched.on('afterMove', (event) => {
      const data = loadNextPageFromLibrary(event.page);
      renderLibrary(genresTransformation(data, genres));
    });

    renderLibrary(genresTransformation(data, genres));
    
    return;
  }
  refs.gallery.innerHTML =
    '<div class="empty"><div class="img-thumb"></div><p class="empty-text">your library is empty...</p></div>';
};



// refs.libraryBtn.addEventListener('click', () => refs.queueBtn.click());

refs.queueBtn.addEventListener('click', makeGalleryFromLibraryItems);
refs.watchedBtn.addEventListener('click', makeGalleryFromLibraryItems);

document.addEventListener('DOMContentLoaded', applyTheme);
window.addEventListener('load', scrollUpInit);
refs.themeSwitcher.addEventListener('change', onChangeThemeSwitcherClick);
