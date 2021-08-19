import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import templateFilmDetailedInfo from '../../templates/detailed-film-card.hbs';
import { clearMarkup, appendMarkup } from './render-markup';
import genresTransformation from './genre-transformator';
import { onButtonLibraryContainerClick, onModalOpenAutorun } from './library-app';
import refs from './refs';
import { MyApi } from './gallery';
import { getGenres } from './session-storage';
import { scrollupBtnChangeVisibility } from './scrollup';
import { themeSwitcherToggle } from './theme';

/*Функция, отвечающая за открытие и функционирование модалки*/
const openModal = async filmId => {
  themeSwitcherToggle();
  refs.modal.classList.toggle('is-hidden');
  scrollupBtnChangeVisibility();
  disableBodyScroll(document.body);

  const modalInfoContainer = refs.modal.querySelector('.modal-movie__info');
  clearMarkup(modalInfoContainer);
  addModalDetailedInfo(modalInfoContainer, filmId);

  refs.modal.firstElementChild.classList.remove('is-hidden');
  refs.modal.addEventListener('click', onButtonLibraryContainerClick);
  refs.modal.addEventListener('click', onModalCloseElemsClick);
  window.addEventListener('keydown', onEscKeyPress);
};
export default openModal;

/*Функция, отвечающая за закрытие модалки*/
const сloseModal = () => {
  refs.modal.removeEventListener('click', onButtonLibraryContainerClick);
  refs.modal.removeEventListener('click', onModalCloseElemsClick);
  window.removeEventListener('keydown', onEscKeyPress);
  enableBodyScroll(document.body);
  refs.modal.firstElementChild.classList.toggle('is-hidden');
  refs.modal.classList.add('is-hidden');
  scrollupBtnChangeVisibility();
  themeSwitcherToggle();
};

/*Функция-обработчик клика на кнопку закрытия или пустую площадь модалки*/
const onModalCloseElemsClick = e => {
  let isCloseButton = null;
  let isBackdropArea = null;

  try {
    isCloseButton = e.target.closest('BUTTON').classList.contains('modal-movie__close-btn');
  } catch {
    isCloseButton = false;
  }

  try {
    isBackdropArea = e.target.classList.contains('modal-movie__backdrop');
  } catch {
    isBackdropArea = false;
  }

  if (!isCloseButton && !isBackdropArea) return;
  сloseModal();
};

/*Функция-обработчик нажатия клавиши ESC на клавиатуре*/
const onEscKeyPress = e => {
  if (e.code === 'Escape') {
    сloseModal();
  }
};

/*
 * Функция для получения актеров по айди фильма
 */
export const getActors = async filmId => {
  const fetchData = MyApi.movieCast(filmId)
    .then(data => {
      let mainActors = data.slice(0, 5).join(', '); // получили строку из 5 главных актеров, эту инфо нужно вставить в карточку
      // console.log('data', data);                 // в табличке добавлено поле Actors и место под список актеров
      // console.log('mainActors:', mainActors);
      return mainActors;
    })
    .catch(error => {
      throw error;
    });
  return fetchData;
};

/*Функция для получения данных с детальной информацией про фильм с последующим рендерингом*/
const addModalDetailedInfo = async (containerLink, filmId) => {
  try {
    const data = await MyApi.movieDetails(filmId);
    const actors = await getActors(filmId);
    const genres = getGenres();

    data.actors = actors;

    if (genres) {
        appendMarkup(containerLink,templateFilmDetailedInfo(genresTransformation(data, genres, 'all')));  
    }
    
    const watchedBtnRef = refs.modal.querySelector('.watched-btn');
    const queueBtnRef = refs.modal.querySelector('.queue-btn');

    onModalOpenAutorun(watchedBtnRef, queueBtnRef, data.id);
  } catch (error) {
    console.log(error);
  }
};




