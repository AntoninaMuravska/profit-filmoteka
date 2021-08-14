import refs from './refs';
import MovieApi from '../api/fetch-api.js';
// import appendMarkup from './render-markup';
import cardTpl from '../../templates/film-cards.hbs';
import genresTransformation from './genre-transformator.js';
import { dateTransformation } from '../components/date-transformation';
import {showWarningMessage } from './notification';
import { clearMarkup } from './render-markup';

refs.headerForm.addEventListener('submit', onSearch);
const MyApi = new MovieApi();

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

  MyApi.resetPage();

  if (inputValue.trim() === '') {
    clearMarkup(refs.gallery);
    console.log(errorMessage);
    showWarningMessage(warningMessage);
  } else {
    MyApi.resetPage();
    // enableLoader();
    MyApi.query = inputValue;
    try {
      MyApi.searchMovies(MyApi.query).then(data => {
        MyApi.genresList().then(genresObj => {
          genresTransformation(MyApi.moviesObj, genresObj);
          createSearchMarkup(data);
        });
        dateTransformation(data);
      });
    } catch (error) {
      throw error;
    }
  }
}

function createSearchMarkup(movies) {
  const movieCard = cardTpl(movies);
  refs.gallery.innerHTML = '';
  refs.gallery.insertAdjacentHTML('beforeend', movieCard);
}
