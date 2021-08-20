import LibraryApi from '../api/library-api';
import { getFilm, saveFilms} from './session-storage';
import { showWarningMessage, showFailureMessage, showSuccesMessage } from './notification';
import { getCurrentGalleryName, empty } from './gallery';
import { paginationLibraryWatched } from './gallery';



const library = new LibraryApi();

/*
 * Обработчик клика на контейнер с кнопками (делегирование) ADD TO WATCH и ADD TO QUEUE в модалке.
 * Кнопкам добавить атрибуты data-name="watched" и data-name="queue" соответственно и
 * data-active="true".
 */
export const onButtonLibraryContainerClick = e => {
  const elem = e.target;
  const isLibraryBtns = e.target.dataset.name === 'watched' || e.target.dataset.name === 'queue';

  if (elem.nodeName !== 'BUTTON' || !isLibraryBtns) {
    return;
  }

  const libraryBtns = {
    watched: e.target.parentNode.querySelector('[data-name="watched"]'),
    queue: e.target.parentNode.querySelector('[data-name="queue"]'),
  };

  const filmId = Number(e.target.dataset.id);

  let librarySource;
  let nonTargetBtn;

  if (elem.dataset.name === 'watched') {
    librarySource = 'watched';
    nonTargetBtn = libraryBtns.queue;
  } else {
    librarySource = 'queue';
    nonTargetBtn = libraryBtns.watched;
  }

  const isActive = elem.dataset.active;

  if (isActive === 'true') {
    const targetFilm = getFilm(filmId);
    library.setData(targetFilm, librarySource);
    showSuccesMessage(`The movie was successfully added to the ${librarySource.toUpperCase()} library `);
    elem.dataset.active = 'false';
    elem.textContent = `remove from ${librarySource}`;
    nonTargetBtn.setAttribute('disabled', '');
  } else {
    const currentGallery = getCurrentGalleryName();
    smartRemovingFromLibrary(filmId, librarySource, currentGallery);
    showSuccesMessage(`Movie successfully removed from ${librarySource.toUpperCase()} library `);
    elem.dataset.active = 'true';
    elem.textContent = `add to ${librarySource}`;
    nonTargetBtn.removeAttribute('disabled');

    //Добавляет оформление пустого контейнера
    const filmCard = document.querySelector('.film-card');

    if (!filmCard) {
      empty();
    }
  }
};

/*
 * Функция, возвращающая первые 20 елементов библиотеки.
 */
export const getLibraryItems = e => {
  const elem = e.currentTarget;

  library.setActiveLibrary(elem.dataset.name);
  library.resetPage();
  library.resetEndStatus();

  let data = null;
  try {
    data = JSON.parse(library.fetchData());
  } catch (error) {
    console.error(error);
  }

  if (!data) {
    showFailureMessage('Your current library is empty!');
    return data;
  }

  if (data.page === data.total_pages) {
    showWarningMessage('These are the last items in the current gallery!');
    library.setEndStatus();
  }

  library.incrementPage();
  return data;
};

/*
 * Функция для реализации пагинации. Подтягивает следующие 20 елементов из активной библиотеки.
 */
export const loadMoreItems = () => {
  let data = null;

  if (library.isEndStatus) {
    showFailureMessage('There are no more items in your library!');
    return data;
  }

  try {
    data = JSON.parse(library.fetchData());
  } catch (error) {
    console.error(error);
  }

  if (!data) {
    showFailureMessage('Oops, something went wrong...');
    return data;
  }

  if (data.page === data.total_pages) {
    showWarningMessage('These are the last items in the current gallery!');
    library.setEndStatus();
  }

  library.incrementPage();
  return data;
};

/*
 * Функция для автозапуска при открытии модалки. Проверяет библиотеку на наличие
 * текущего фильма по id и производит настройку кнопок модалки для корректного отображения
 * и функционирования. В функцию необходимо передать ссылки на кнопки.
 */
export const onModalOpenAutorun = (watchBtnLink, queueBtnLink, filmId) => {
  const checkingResult = library.availabilityChecking(filmId);

  if (checkingResult.isAvailable) {
    if (checkingResult.sourceLibrary === 'watched') {
      changingElemsProperties(watchBtnLink, queueBtnLink, checkingResult.sourceLibrary);
    } else {
      changingElemsProperties(queueBtnLink, watchBtnLink, checkingResult.sourceLibrary);
    }
  }
};

/*
 * Функция для изменения свойств кнопок (добавления елемента в библиотеку) для отключения одной и включения другой
 */
const changingElemsProperties = (elemForEnabling, elemForDisabling, sourceLibrary) => {
  elemForEnabling.dataset.active = 'false';
  elemForEnabling.removeAttribute('disabled');
  elemForEnabling.textContent = `Remove from ${sourceLibrary}`;

  elemForDisabling.dataset.active = 'true';
  elemForDisabling.setAttribute('disabled', '');
};


/* Функция удаления елемента из библиотеки и из галлереи */
const smartRemovingFromLibrary = (filmId, librarySource, activeGallery = 'Home') => {
  const targetItem = library.getItem(filmId, librarySource);
  
  saveFilms([targetItem]);
  library.removeData(filmId, librarySource);
  
  if (activeGallery !== 'Home') {
    const totalItems = paginationLibraryWatched._options.totalItems - 1;
    const currentPage = paginationLibraryWatched._currentPage;
    paginationLibraryWatched.setTotalItems(totalItems);
    paginationLibraryWatched.movePageTo(currentPage);
  }
};

/*
 * Функция для реализации пагинации. Подтягивает следующие елементы из заданной страницы.
 */
export const loadNextPageFromLibrary = page => {
  let data = null;
  
  try {
    data = JSON.parse(library.fetchDataByPage(page));
  } catch (error) {
    console.error(error);
  }

  if (!data) {
    return data;
  }

  if (data.page === data.total_pages) {
    showWarningMessage('These are the last items in the current gallery!');
    library.setEndStatus();
  }

  library.incrementPage();
  return data;
};
