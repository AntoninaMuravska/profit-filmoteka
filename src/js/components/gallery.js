import cardTpl from '../../templates/film-cards.hbs';
import MovieApi from '../api/fetch-api.js';
import refs from '../../js/components/refs.js';
import genresTransformation from './genre-transformator.js';
import openModal from './modal';
import { dateTransformation } from '../components/date-transformation';
import { getItemFromSessionStorage } from '../components/session-storage';

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

renderGallery();

/*Функция-обработчик клика на елемент галереи*/
export const onGalleryItemClick = e => {
  const cardRef = e.target.closest('.film-card___container');
  openModal(cardRef.dataset.id);
};

//Отрисовка библиотеки
export const renderLibrary = function (data) {
  refs.filmCardRef.innerHTML = cardTpl(data.results);
};

//рисует галерею при нажатии HOME
export const createMarkupHome = function () {
  const movieCard = cardTpl(getItemFromSessionStorage('movies'));
  refs.filmCardRef.insertAdjacentHTML('beforeend', movieCard);
};
