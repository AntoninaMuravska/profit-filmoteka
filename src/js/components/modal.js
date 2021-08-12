import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import templateFilmDetailedInfo from '../../templates/detailed-film-card.hbs';
import { clearMarkup, appendMarkup } from './render-markup';
import genresTransformation from './genre-transformator';
import { onButtonLibraryContainerClick, onModalOpenAutorun } from './library-app';
import refs from './refs';
import { MyApi } from './gallery';

/**Временные данные*/
import genresObject from '../../json/example-genres.json';

/*Функция, отвечающая за открытие и функционирование модалки*/
const openModal = async filmId => {
  refs.modal.classList.toggle('is-hidden');
  
  disableBodyScroll(document.body);
  const modalInfoContainer = refs.modal.querySelector('.modal-movie__info');

  clearMarkup(modalInfoContainer);

  function addCardInfo() {
    try {
      MyApi.movieDetails(filmId).then(data => {
        appendMarkup(modalInfoContainer, templateFilmDetailedInfo(genresTransformation(data, genresObject, "all")));

        const watchedBtnRef = refs.modal.querySelector('.watched-btn');
        const queueBtnRef = refs.modal.querySelector('.queue-btn');
        
        onModalOpenAutorun(watchedBtnRef, queueBtnRef, data.id);
      });
    } catch (error) {
      throw error;
    }
  }
  addCardInfo();


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
  refs.modal.classList.toggle('is-hidden');
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
  console.log('ESC');
  if (e.code === 'Escape') {
    сloseModal();
  }
};
