import templateFilmDetailedInfo from '../../templates/detailed-film-card.hbs';
import { clearMarkup, appendMarkup } from './render-markup';
import genresTransformation from './genre-transformator';
import { onButtonLibraryContainerClick } from './library-app';
import refs from './refs';
import { MyApi } from './gallery';


/**Тестовые данные */
import filmDetailedInfo from '../../json/example-detailed-info.json';


/*Функция, отвечающая за открытие и функционирование модалки*/
const openModal = async filmId => {
  refs.modal.classList.toggle('is-hidden');
  const modalInfoContainer=refs.modal.querySelector('.modal-movie__info');
  console.log(filmId);
  
  /*
  *ТУТ ДОЛЖЕН БЫТЬ ЗАПРОС ПО ID. Возвращенный объект передаем в следующее выражение.
  */

  const data = filmDetailedInfo;

  clearMarkup(modalInfoContainer);
  appendMarkup(modalInfoContainer, templateFilmDetailedInfo(data)); /** ЗАМЕНИТЬ НА ВХОДЯЩИЕ ДАННЫЕ  */

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

  refs.modal.classList.toggle('is-hidden');
}



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
}



/*Функция-обработчик нажатия клавиши ESC на клавиатуре*/
const onEscKeyPress = e => {
  console.log('ESC');
  if (e.code === 'Escape') {
    сloseModal();
  }
}






