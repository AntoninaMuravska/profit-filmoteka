import cardTpl from '../../templates/film-cards.hbs';
import MovieApi from '../api/fetch-api';
import refs from './refs';
import genresTransformation from './genre-transformator.js';
import openModal from './modal';
import { dateTransformation } from './date-transformation';
import { enableLoader, disableLoader } from './notification';
import { scrollReveal } from './scroll-reveal';
import { paginationInit } from './pagination';
import { clearMarkup } from './render-markup';
import { getLibraryItems } from './library-app';
import { getGenres, getItemFromSessionStorage } from './session-storage';
import { scrollToHeader } from './scrollup';
import { loadNextPageFromLibrary } from './library-app';

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
    throw error;
  }
};

function createMarkup(movies) {
  const movieCard = cardTpl(movies);
  refs.gallery.insertAdjacentHTML('beforeend', movieCard);
  scrollReveal();
}

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
  const galleryName = document.querySelector('.header .nav__link.is_active').dataset.name;
  return galleryName === 'home' ? 'Home' : 'MyLibrary';
};

// export const getThrendesFilms = function () {
//   let fetchData = null;
//   try {
//     MyApi.getTrendingMovies().then(data => {
//       MyApi.genresList().then(genresObj => {
//         genresTransformation(MyApi.moviesObj, genresObj);

//       });
//       console.log('данные из запроса', data);
//       fetchData = data;
//       return dateTransformation(data);
//     });
//   } catch (error) {
//     throw error;
//   }
//   console.log('возврат ', fetchData);
//   return fetchData;
// }



export const getThrendesFilms = async (page) => {
  if (page === 1) {
    try {
      const data = await MyApi.getTrendingMovies().then(movies =>  {return movies});
      // console.log(data)
      return data;
    } catch (eror) {
      throw error;
    }
    
  } else {
    try {
      const data = await MyApi.getTrendingMovies(page).then(movies =>  {return movies});
      console.log('В функции getThrendesFilms data: ', data)
      return data;
    } catch (eror) {
      throw error;
    }
  }

  

  
  // MyApi.getTrendingMovies().then(data => {
  //   MyApi.genresList().then(genresObj => {
  //     genresTransformation(MyApi.moviesObj, genresObj);

  //   });
  //   console.log('данные из запроса', data);
  //   fetchData = data;
  //   return dateTransformation(data);
  // });

  // console.log('возврат ', fetchData);
  // return fetchData;
};

// const btn1 = document.querySelector('.btn1');
// btn1.addEventListener('click', getThrendesFilms(2))

export const getSearchedFilms = async () => {
  // const data = await MyApi.getTrendingMovies();
  alert('функционал в процессе разработки');
  return null;
};

/*
 * Функция обработчик клика на кнопки WATCHED и QUEUE. вытягивает данные из библиотеки,
 * инициализирует пагинацию, рендерит
 */
export const makeGalleryFromLibraryItems = e => {
  enableLoader('.section-gallery', 'Loading...');
  const genres = getGenres();
  const data = getLibraryItems(e);
  disableLoader('.section-gallery');

  if (data) {
    const paginationLibraryWatched = paginationInit(data.total_results);
    paginationLibraryWatched.on('afterMove', (event) => {
      clearMarkup(refs.gallery);
      setTimeout(scrollToHeader(), 0);
      setTimeout(() => {
        enableLoader('.section-gallery', 'Loading...');
        const data = loadNextPageFromLibrary(event.page);
        renderLibrary(genresTransformation(data, genres));
        disableLoader('.section-gallery', 'Loading...');
      }, 100);
    });

    renderLibrary(genresTransformation(data, genres));
    return;
  }
  refs.gallery.innerHTML =
    '<div class="empty"><div class="img-thumb"></div><p class="empty-text">your library is empty...</p></div>';
};

/*
 * Функция-обработчик клика на нкопку Home (так же срабатывает на событии load) (отправляет запрос, получает данные,
 * инициализирует пагинацию и рендерит галлерею)
 */
export const makeGalleryFromThrendesFilms = async e => {
  e.preventDefault();
   
  enableLoader('.section-gallery', 'Loading...');
  const genres = getGenres();
  const data = await getThrendesFilms();
  disableLoader('.section-gallery');

  if (data) {
    const paginationThrendesFilms = paginationInit(data.total_results);
    paginationThrendesFilms.on('afterMove', event => {
      clearMarkup(refs.gallery);
      setTimeout(scrollToHeader(),0);
      setTimeout(async () => {
        enableLoader('.section-gallery', 'Loading...');
        const data = await getThrendesFilms(event.page);
        renderLibrary(genresTransformation(data, genres));
        disableLoader('.section-gallery');
      }, 100);
    });
    renderLibrary(genresTransformation(data, genres));
  }
};

/*
 * Функция-обработчик клика на сабмит формы поиска (отправляет запрос, получает данные,
 * инициализирует пагинацию и рендерит галлерею)
 */
export const makeGalleryFromSearchedFilms = async e => {
  // e.preventDefault();
  console.log('запускаем функцию для поиска');

  enableLoader('.section-gallery', 'Loading...');
  const genres = getGenres();
  const data = await getSearchedFilms(); /**ПОМЕНЯТЬ ФУНКЦИЮ НА ТУ ЧТО ТЯНЕТ ДАННЫЕ С ПОИСКА**** */
  disableLoader('.section-gallery');

  console.log('Попытка получить данные для инициализации пагинации',data);
  console.log(data.results.length);

  if (data) {
    const paginationSearchedFilms = paginationInit(data.results.length);
    paginationSearchedFilms.on('afterMove', (event) => {
      clearMarkup(refs.gallery);
      setTimeout(scrollToHeader(),0);
      setTimeout(() => {
        enableLoader('.section-gallery', 'Loading...');
        /**const data = <НАЗВАНИЕ ФУНКЦИИ ПОЛУЧЕНИЯ ПОРЦИИ ТРЕНДОВЫХ ФИЛЬМОВ ПО ЗАДАНОМУ НОВМЕРУ СТРАНИЦЫ>(event.page);**/
        renderLibrary(genresTransformation(data, genres));
        disableLoader('.section-gallery');
      }, 100);
    });
    renderLibrary(genresTransformation(data, genres));
  }
};

/*Функция получения объекта с жанрами и помещения его в session-storage*/
export const fetchGenres = async () => {
  MyApi.genresList();
};
