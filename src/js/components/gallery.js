import cardTpl from '../../templates/film-cards.hbs';
import MovieApi from '../api/fetch-api';
import refs from './refs';
import genresTransformation from './genre-transformator.js';
import openModal from './modal';
import { dateTransformation } from './date-transformation';
import { enableLoader, disableLoader, showWarningMessage } from './notification';
import { scrollReveal } from './scroll-reveal';
import { paginationInit, paginationBarShow, paginationBarHide, isOnlyOnePage } from './pagination';
import { clearMarkup } from './render-markup';
import { getLibraryItems } from './library-app';
import { getGenres } from './session-storage';
import { scrollToHeader } from './scrollup';
import { loadNextPageFromLibrary } from './library-app';

refs.headerForm.addEventListener('submit', onSearch);
refs.clearInputBtn.addEventListener('click', () => (refs.input.value = ''));

export const MyApi = new MovieApi();
export let paginationLibraryWatched;

export const renderGallery = function () {
  try {
    MyApi.getTrendingMovies().then(data => {
      MyApi.genresList().then(genresObj => {
        genresTransformation(MyApi.moviesObj, genresObj);

        createMarkup(data);
        scrollReveal();
      });
      return dateTransformation(data);
    });
  } catch (error) {
    throw new Error();
  }
};


/*Функция добавления разметки*/
export function createMarkup(data) {
  const movieCard = cardTpl(data);
  refs.gallery.insertAdjacentHTML('beforeend', movieCard);
  scrollReveal();
}

/*Функция-обработчик клика на елемент галереи*/
export const onGalleryItemClick = e => {
  if (e.target.classList.contains('gallery')) {
    return;
  }

  const cardRef = e.target.closest('.film-card___container');
  enableLoader('.modal-movie__backdrop', 'Loading...');

  openModal(cardRef.dataset.id);
  disableLoader('.modal-movie__backdrop');
};

//Отрисовка библиотеки
export const renderLibrary = function (data) {
  dateTransformation(data.results);
  refs.gallery.innerHTML = cardTpl(data.results);
  scrollReveal();
};


/*Функция для удаления заданного по id елемента из галереи*/
export const removeElemFromGallery = function (filmId) {
  const elemToRemoveRef = refs.gallery.querySelector(`li[data-id="${filmId}"]`);

  if (!elemToRemoveRef) {
    return;
  }

  elemToRemoveRef.remove();
};

/*Функция определения названия текущей активной галереи*/
export const getCurrentGalleryName = function () {
  const galleryName = document.querySelector('.header .nav__btn.is_active').dataset.name;
  return galleryName === 'home' ? 'Home' : 'MyLibrary';
};


/*
 * Функция для получения трендовых фильмов. если номер страницы не задан - тянет первую страницу,
 * иначе - заданную
 */
export const getThrendesFilms = async (page = 1) => {
  const fetchData = MyApi.getTrendingMovies(page)
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
  return fetchData;
};


/*
 * Функция для получения популярных фильмов. если номер страницы не задан - тянет первую страницу,
 * иначе - заданную
 */
export const getPopularFilms = async (page = 1) => {
  const fetchData = MyApi.getPopularMovies(page)
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
  return fetchData;
};


/*
 * Функция для получения фильмов по рейтингу. если номер страницы не задан - тянет первую страницу,
 * иначе - заданную
 */
export const getTopRatedFilms = async (page = 1) => {
  const fetchData = MyApi.getTopRatedMovies(page)
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
  return fetchData;
};


/*
 * Функция для получения новинок. если номер страницы не задан - тянет первую страницу,
 * иначе - заданную
 */
export const getUpcomingFilms = async (page = 1) => {
  const fetchData = MyApi.getUpcomingMovies(page)
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
  return fetchData;
};


/*
 * Функция для получения фильмов с помощью поиска. если номер страницы не задан - тянет первую страницу,
 * иначе - заданную
 */

export const getSearchedFilms = (page = 1) => {
  const fetchData = MyApi.searchMovies(page)
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
  return fetchData;
};


//функция отрисовки фильмов по ключевому слову
function onSearch(e) {
  e.preventDefault();
  let inputValue = e.target.elements.searchQuery.value;
  let warningMessage = 'We do not know such a movie. Please, try again.';

  if (!inputValue) {
    clearMarkup(refs.gallery);
    showWarningMessage(warningMessage);
    return;
  }

  if (inputValue.trim() === '') {
    clearMarkup(refs.gallery);
    showWarningMessage(warningMessage);
  } else {
    MyApi.resetPage();

    return MyApi.searchQuery(inputValue);
  }
}


/*
 * Функция обработчик клика на кнопки WATCHED и QUEUE. вытягивает данные из библиотеки,
 * инициализирует пагинацию, рендерит
 */
export const makeGalleryFromLibraryItems = async e => {
  enableLoader('.section-gallery', 'Loading...');
  const genres = getGenres();
  let data = null;
  try {
    data = getLibraryItems(e);
  } catch (error) {
    console.log(error);
  }
  disableLoader('.section-gallery');

  paginationBarHide();

  if (data) {
    paginationLibraryWatched = paginationInit(data.total_results);
    paginationLibraryWatched.on('afterMove', event => {
      paginationBarHide();
      clearMarkup(refs.gallery);
      setTimeout(scrollToHeader(), 0);
      setTimeout(() => {
        enableLoader('.section-gallery', 'Loading...');
        const data = loadNextPageFromLibrary(event.page);
        if (!data) {
          disableLoader('.section-gallery', 'Loading...');
          return;
        }
        renderLibrary(genresTransformation(data, genres));
        
        if (!isOnlyOnePage(paginationLibraryWatched)) {
          paginationBarShow();
        }
        disableLoader('.section-gallery', 'Loading...');
      }, 100);
    });

    renderLibrary(genresTransformation(data, genres));

    if (!isOnlyOnePage(paginationLibraryWatched)) {
      paginationBarShow();
    }
    return;
  }

  refs.gallery.innerHTML =
    '<li class="empty"><p class="empty-text">there is nothing here...</p></li>';
};


/*
 * Функция-обработчик клика на нкопку Home (так же срабатывает на событии load) (отправляет запрос, получает данные,
 * инициализирует пагинацию и рендерит галлерею)
 */
export const makeGalleryFromFilmsByCathegory = async (sortName) => {
  enableLoader('.section-gallery', 'Loading...');
  const genres = getGenres();
  let data = null;
  try {
    switch (sortName) {
      case 'trending-btn':
        data = await getThrendesFilms();
        break;
      case 'popular-btn':
        data = await getPopularFilms();
        break;
      case 'toprated-btn':
        data = await getTopRatedFilms();
        break;
      case 'upcoming-btn':
        data = await getUpcomingFilms();
        break;
      default:
        data = await getThrendesFilms();
     }
  } catch (error) {
    console.log(error);
  }
  disableLoader('.section-gallery');

  paginationBarHide();

  if (data && data.results.length) {
    const paginationFilmsByGathegory = paginationInit(data.total_results);
    paginationFilmsByGathegory.on('afterMove', event => {
      paginationBarHide();
      clearMarkup(refs.gallery);
      setTimeout(scrollToHeader(), 0);
      setTimeout(async () => {
        enableLoader('.section-gallery', 'Loading...');
        switch (sortName) {
          case 'trending-btn':
            data = await getThrendesFilms(event.page);
            break;
          case 'popular-btn':
            data = await getPopularFilms(event.page);
            break;
          case 'toprated-btn':
            data = await getTopRatedFilms(event.page);
            break;
          case 'upcoming-btn':
            data = await getUpcomingFilms(event.page);
            break;
          default:
            data = await getThrendesFilms(event.page);
        }
        renderLibrary(genresTransformation(data, genres));
        
        if (!isOnlyOnePage(paginationFilmsByGathegory)) {
          paginationBarShow();
        }
        disableLoader('.section-gallery');
      }, 100);
    });
    renderLibrary(genresTransformation(data, genres));

    if (!isOnlyOnePage(paginationFilmsByGathegory)) {
      paginationBarShow();
    }
  }
};


/*
 * Функция-обработчик клика на сабмит формы поиска (отправляет запрос, получает данные,
 * инициализирует пагинацию и рендерит галлерею)
 */
export const makeGalleryFromSearchedFilms = async e => {
  e.preventDefault();
  enableLoader('.section-gallery', 'Loading...');
  const genres = getGenres();
  let data = null;
  try {
    data = await getSearchedFilms();
  } catch (error) {
    console.log(error);
  }
  disableLoader('.section-gallery');
  paginationBarHide();

  if (data && data.results.length) {
    const paginationSearchedFilms = paginationInit(data.total_results);
    paginationSearchedFilms.on('afterMove', event => {
      paginationBarHide();
      clearMarkup(refs.gallery);
      setTimeout(scrollToHeader(), 0);
      setTimeout(async () => {
        enableLoader('.section-gallery', 'Loading...');
        const data = await getSearchedFilms(event.page);
        renderLibrary(genresTransformation(data, genres));
        
        if (!isOnlyOnePage(paginationSearchedFilms)) {
          paginationBarShow();
        }
        disableLoader('.section-gallery');
      }, 100);
    });
    renderLibrary(genresTransformation(data, genres));
    
    if (!isOnlyOnePage(paginationSearchedFilms)) {
      paginationBarShow();
    }
    return;
  }
  empty();
};


/*Функция получения объекта с жанрами и помещения его в session-storage*/
export const fetchGenres = async () => {
  MyApi.genresList();
};

//empty container
export const empty = function () {
  refs.gallery.innerHTML =
    '<li class="empty"><p class="empty-text">there is nothing here...</p></li>';
};


/*Функция обновления текущей странички галлереи библиотеки при удалении из нее елемента*/
export const updateGalleryFromLibraryFilms = page => {
  const genres = getGenres();
  paginationBarHide();
  const data = loadNextPageFromLibrary(page);

  if (data) {
    renderLibrary(genresTransformation(data, genres));
    paginationBarShow();
    return;
  }
  empty();
};


