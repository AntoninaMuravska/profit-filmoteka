import refs from './refs';
import MovieApi from '../api/fetch-api.js';
// import appendMarkup from './render-markup';
import cardTpl from '../../templates/film-cards.hbs';
import genresTransformation from './genre-transformator.js';
import { dateTransformation } from '../components/date-transformation';
import { enableLoader, showFailureMessage } from './notification';

refs.headerForm.addEventListener('submit', onSearch);
const MyApi = new MovieApi();

//функция отрисовки фильмов по ключевому слову
function onSearch(e) {
  e.preventDefault();
  let inputValue = e.target.elements.searchQuery.value;
  let errorMessage = 'Can not find such a movie. Please, try again.';

  if (inputValue.trim() === '') {
    console.log(errorMessage);
    // showFailureMessage(errorMessage);
  } else {
    MyApi.resetPage();
    // enableLoader();
    MyApi.query = inputValue;
    try {
      MyApi.searchMovies(MyApi.query).then(data => {
        MyApi.genresList().then(genresObj => {
          genresTransformation(MyApi.moviesObj, genresObj);
          createSearchMarkup(data);

          //Добавляет оформление пустого контейнера
          const filmCard = document.querySelector('.film-card');

          if (!filmCard) {
            refs.filmCardRef.innerHTML =
              '<div class="empty"><div class="img-thumb"></div><p class="empty-text">The search has not given any results...</p></div>';
          }
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
  refs.filmCardRef.innerHTML = '';
  refs.filmCardRef.insertAdjacentHTML('beforeend', movieCard);
}
