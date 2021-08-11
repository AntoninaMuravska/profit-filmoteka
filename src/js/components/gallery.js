import cardTpl from '../../templates/film-cards.hbs';
import MovieApi from '../api/fetch-api.js';
import refs from '../../js/components/refs.js';
import genresTransformation from './genre-transformator.js';
import openModal from './modal';

export const MyApi = new MovieApi();

function renderGallery() {
  try {
    MyApi.getTrendingMovies().then(data => {
      MyApi.genresList().then(genresObj => {
        genresTransformation(MyApi.moviesObj, genresObj);
        console.log(data)
        
        createMarkup(data);
      })
      // console.log(data)
      // createMarkup(data);
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