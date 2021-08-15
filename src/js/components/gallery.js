import cardTpl from '../../templates/film-cards.hbs';
import MovieApi from '../api/fetch-api.js';
import refs from '../../js/components/refs.js';
import genresTransformation from './genre-transformator.js';
import openModal from './modal';
import { dateTransformation } from '../components/date-transformation';
import { enableLoader, disableLoader } from './notification';
import { getItemFromSessionStorage, getGenres } from '../components/session-storage';
import { appendMarkup } from './render-markup';


export const MyApi = new MovieApi();

export const renderGallery = function () {
  try {
    MyApi.getTrendingMovies().then(data => {
      MyApi.genresList().then(genresObj => {
        genresTransformation(MyApi.moviesObj, genresObj);
        
        createMarkup(data);
      });
      dateTransformation(data);
    });
  } catch (error) {
    throw error;
  }
}


function createMarkup(movies) {
  const movieCard = cardTpl(movies);
  refs.gallery.insertAdjacentHTML('beforeend', movieCard);
}

enableLoader('.gallery', 'Loading...');
renderGallery();
disableLoader('.gallery');

/*Функция-обработчик клика на елемент галереи*/
export const onGalleryItemClick = e => {
  const cardRef = e.target.closest('.film-card___container');

  enableLoader('.modal-movie__backdrop', 'Loading...');

  openModal(cardRef.dataset.id);
  disableLoader('.modal-movie__backdrop');
};

//Отрисовка библиотеки
export const renderLibrary = function (data) {
  dateTransformation(data.results);
  refs.gallery.innerHTML = cardTpl(data.results);
};

//рисует галерею при нажатии HOME
export const createMarkupHome = function () {
  const arrayFilms = getItemFromSessionStorage('popular');
  const genres = getGenres();

  genresTransformation(arrayFilms, genres);
  dateTransformation(arrayFilms.results);

  const movieCard = cardTpl(arrayFilms.results);
  refs.gallery.insertAdjacentHTML('beforeend', movieCard);
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
  const galleryName = document.querySelector('.header .nav__link.is_active').dataset.name;
  return galleryName === 'home' ? 'Home' : 'MyLibrary';
};
