import cardTpl from '../../templates/film-cards.hbs';
import MovieApi from '../api/fetchApi.js';
import refs from '../../js/components/refs.js';
import genresTransformation from './genre-transformator.js';

const MyApi = new MovieApi();

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
