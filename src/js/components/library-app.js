import LibraryApi from '../api/library-api';
import { getFilm } from './session-storage';

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
  const targetFilm = getFilm(filmId);
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
    library.setData(targetFilm, librarySource);
    elem.dataset.active = 'false';
    elem.textContent = `remove from ${librarySource}`;
    nonTargetBtn.setAttribute('disabled', '');
  } else {
    library.removeData(filmId, librarySource);
    elem.dataset.active = 'true';
    elem.textContent = `add to ${librarySource}`;
    nonTargetBtn.removeAttribute('disabled');
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
    alert('No elements found!');
    return data;
  }

  if (data.page === data.total_pages) {
    alert('You get the last one!');
    library.setEndStatus();
  }

  library.incrementPage();
  // console.log(data);
  return data;
};

/*
 * Функция для реализации пагинации. Подтягивает следующие 20 елементов из активной библиотеки.
 */
export const loadMoreItems = () => {
  let data = null;

  if (library.isEndStatus) {
    alert('no more items!!');
    return data;
  }

  try {
    data = JSON.parse(library.fetchData());
  } catch (error) {
    console.error(error);
  }

  if (!data) {
    alert('No elements found!');
    return data;
  }

  if (data.page === data.total_pages) {
    alert('You get the last one!');
    library.setEndStatus();
  }

  library.incrementPage();
  // console.log(data);
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
