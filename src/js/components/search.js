import refs from './refs';
import MovieApi from '../api/fetch-api.js';
// import appendMarkup from './render-markup';
import cardTpl from '../../templates/film-cards.hbs';
import genresTransformation from './genre-transformator.js';
import { dateTransformation } from '../components/date-transformation';
import { showWarningMessage } from './notification';
import { clearMarkup } from './render-markup';
import { scrollReveal } from './scroll-reveal';

// refs.headerForm.addEventListener('submit', onSearch);
// refs.clearInputBtn.addEventListener('click', () => {
//   refs.input.value = '';
// });
// const MyApi = new MovieApi();

// //функция отрисовки фильмов по ключевому слову
// export function onSearch(e) {
//   e.preventDefault();
//   let inputValue = e.target.elements.searchQuery.value;
//   let warningMessage = 'We do not know such a movie. Please, try again.';

//   if (!inputValue) {
//     clearMarkup(refs.gallery);
//     showWarningMessage(warningMessage);
//     return;
//   }

//   MyApi.resetPage();

//   if (inputValue.trim() === '') {
//     clearMarkup(refs.gallery);
//     console.log(errorMessage);
//     showWarningMessage(warningMessage);
//   } else {
//     MyApi.resetPage();
//     // enableLoader();
//     MyApi.searchQuery(inputValue)
//     // MyApi.query = inputValue;
//     try {
//       MyApi.searchMovies().then(data => {
//         MyApi.genresList().then(genresObj => {
//           genresTransformation(MyApi.moviesObj, genresObj);
//           createSearchMarkup(data);

//           //Добавляет оформление пустого контейнера
//           const filmCard = document.querySelector('.film-card');

//           if (!filmCard) {
//             refs.gallery.innerHTML =
//               '<div class="empty"><div class="img-thumb"></div><p class="empty-text">The search has not given any results...</p></div>';
//           }
//         });
//         dateTransformation(data);
//       });
//     } catch (error) {
//       throw error;
//     }
//   }
// }

// function createSearchMarkup(movies) {
//   const movieCard = cardTpl(movies);
//   refs.gallery.innerHTML = '';
//   refs.gallery.insertAdjacentHTML('beforeend', movieCard);
//   scrollReveal();
// }
