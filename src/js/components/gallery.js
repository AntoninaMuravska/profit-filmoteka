import cardTpl from '../../templates/film-cards.hbs';
import MovieApi from '../api/fetch-api.js';
import refs from '../../js/components/refs.js';
import genresTransformation from './genre-transformator.js';
import openModal from './modal';
import { dateTransformation } from '../components/date-transformation';
import Notiflix from 'notiflix';

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

Notiflix.Block.init({svgSize:"80px",svgColor:"#2835e3",fontFamily:"Roboto",useGoogleFont:true,});
Notiflix.Block.standard('.gallery', 'Loading...');
renderGallery();
Notiflix.Block.remove('.gallery');


/*Функция-обработчик клика на елемент галереи*/
export const onGalleryItemClick = e => {
  const cardRef = e.target.closest('.film-card___container');

  Notiflix.Block.init({svgSize:"80px",svgColor:"#2835e3",fontFamily:"Roboto",useGoogleFont:true,});
  Notiflix.Block.standard('.modal-movie__backdrop', 'Loading...');
  openModal(cardRef.dataset.id);
  Notiflix.Block.remove('.modal-movie__backdrop');
};
