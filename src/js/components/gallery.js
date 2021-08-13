import cardTpl from '../../templates/film-cards.hbs';
import MovieApi from '../api/fetch-api.js';
import refs from '../../js/components/refs.js';
import genresTransformation from './genre-transformator.js';
import openModal from './modal';
import { dateTransformation } from '../components/date-transformation';
import { enableLoader,disableLoader } from './notification';
import { getItemFromSessionStorage, getGenres } from '../components/session-storage';


export const MyApi = new MovieApi();

function renderGallery() {
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
  refs.filmCardRef.insertAdjacentHTML('beforeend', movieCard);
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
  refs.filmCardRef.innerHTML = cardTpl(data.results);
};

//рисует галерею при нажатии HOME
export const createMarkupHome = function () {
  const arrayFilms = getItemFromSessionStorage('popular');
  const genres = getGenres();

  genresTransformation(arrayFilms, genres);
  dateTransformation(arrayFilms.results);

  const movieCard = cardTpl(arrayFilms.results);
  refs.filmCardRef.insertAdjacentHTML('beforeend', movieCard);
};
