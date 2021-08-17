import cardTpl from '../../templates/film-cards.hbs';
import MovieApi from '../api/fetch-api';
import refs from './refs';
import genresTransformation from './genre-transformator.js';
import openModal from './modal';
import { dateTransformation } from './date-transformation';
import { enableLoader, disableLoader, showWarningMessage } from './notification';
import { scrollReveal } from './scroll-reveal';
import { paginationInit, paginationBarShow, paginationBarHide } from './pagination';
import { clearMarkup } from './render-markup';
import { getLibraryItems } from './library-app';
import { getGenres, getItemFromSessionStorage } from './session-storage';
import { scrollToHeader } from './scrollup';
import { loadNextPageFromLibrary } from './library-app';

refs.headerForm.addEventListener('submit', onSearch);
refs.clearInputBtn.addEventListener('click', () => refs.input.value = '');

export const MyApi = new MovieApi();

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
    throw new Error;
  }
};


/*Функция добавления разметки*/
function createMarkup(data) {
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

//рисует галерею при нажатии HOME
export const createMarkupHome = function () {
  const arrayFilms = getItemFromSessionStorage('popular');
  const genres = getGenres();

  genresTransformation(arrayFilms, genres);
  dateTransformation(arrayFilms.results);

  const movieCard = cardTpl(arrayFilms.results);
  refs.gallery.insertAdjacentHTML('beforeend', movieCard);
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
    const paginationLibraryWatched = paginationInit(data.total_results);
    paginationLibraryWatched.on('afterMove', event => {
      paginationBarHide();
      clearMarkup(refs.gallery);
      setTimeout(scrollToHeader(), 0);
      setTimeout(() => {
        enableLoader('.section-gallery', 'Loading...');
        const data = loadNextPageFromLibrary(event.page);
        renderLibrary(genresTransformation(data, genres));
        paginationBarShow();
        disableLoader('.section-gallery', 'Loading...');
      }, 100);
    });

    renderLibrary(genresTransformation(data, genres));
    paginationBarShow();
    return;
  }

  refs.gallery.innerHTML =
    '<li class="empty"><p class="empty-text">there is nothing here...</p></li>';
};

/*
 * Функция-обработчик клика на нкопку Home (так же срабатывает на событии load) (отправляет запрос, получает данные,
 * инициализирует пагинацию и рендерит галлерею)
 */
export const makeGalleryFromThrendesFilms = async e => {
  enableLoader('.section-gallery', 'Loading...');
  const genres = getGenres();
  let data = null;
  try {
    data = await getThrendesFilms();
  } catch (error) {
    console.log(error);
  }
  disableLoader('.section-gallery');

  paginationBarHide();

  if (data) {
    const paginationThrendesFilms = paginationInit(data.total_results);
    paginationThrendesFilms.on('afterMove', event => {
      paginationBarHide();
      clearMarkup(refs.gallery);
      setTimeout(scrollToHeader(), 0);
      setTimeout(async () => {
        enableLoader('.section-gallery', 'Loading...');
        const data = await getThrendesFilms(event.page);
        renderLibrary(genresTransformation(data, genres));
        paginationBarShow();
        disableLoader('.section-gallery');
      }, 100);
    });
    renderLibrary(genresTransformation(data, genres));
    paginationBarShow();
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

  if (data) {
    const paginationSearchedFilms = paginationInit(data.total_results);
    paginationSearchedFilms.on('afterMove', event => {
      paginationBarHide();
      clearMarkup(refs.gallery);
      setTimeout(scrollToHeader(), 0);
      setTimeout(async () => {
        enableLoader('.section-gallery', 'Loading...');
        const data = await getSearchedFilms(event.page);
        renderLibrary(genresTransformation(data, genres));
        paginationBarShow();
        disableLoader('.section-gallery');
      }, 100);
    });
    renderLibrary(genresTransformation(data, genres));
    paginationBarShow();
  }
};

/*Функция получения объекта с жанрами и помещения его в session-storage*/
export const fetchGenres = async () => {
  MyApi.genresList();
};
