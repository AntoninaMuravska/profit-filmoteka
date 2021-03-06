import refs from './refs';
import {
  makeGalleryFromLibraryItems,
  makeGalleryFromFilmsByCathegory,
  makeGalleryFromSearchedFilms,
} from './gallery';

export const onHomeBtnClick = function (e) {
  const ratings = document.querySelectorAll('.rating');

  if (!refs.libraryBtn.classList.contains('is_active')) {
    ratings.forEach(rating => rating.classList.add('visually-hidden'));
  } else {
    toggleClass(e);
  }

  const selectionBtnsContainer = document.querySelector('.selection-buttons');
  selectionBtnsContainer.addEventListener('click', activateSelectionCathegoryBtnsContainer);
  selectionBtnsContainer.firstElementChild.click();

  refs.headerForm.addEventListener('submit', makeGalleryFromSearchedFilms);
  refs.queueBtn.removeEventListener('click', onBtnClick);
  refs.watchedBtn.removeEventListener('click', onBtnClick);
};

export const onLibraryBtnClick = function (e) {
  const ratings = document.querySelectorAll('.rating');

  if (refs.libraryBtn.classList.contains('is_active')) {
    ratings.forEach(rating => rating.classList.remove('visually-hidden'));
  } else {
    toggleClass(e);
  }

  const selectionBtnsContainer = document.querySelector('.selection-buttons');
  selectionBtnsContainer.removeEventListener('click', activateSelectionCathegoryBtnsContainer);

  refs.headerForm.removeEventListener('submit', makeGalleryFromSearchedFilms);
  refs.queueBtn.addEventListener('click', onBtnClick);
  refs.watchedBtn.addEventListener('click', onBtnClick);
  refs.queueBtn.click(); //иммитация нажатия кнопки queue
};

function onBtnClick(e) {
  toggleClass(e);
  makeGalleryFromLibraryItems(e);
}

//функция добавляет/удаляет классы с кнопок
function toggleClass(e) {
  const dataName = e.currentTarget.dataset.name;

  if (dataName === 'watched') {
    refs.watchedBtn.classList.add('is_active_btn');
    refs.queueBtn.classList.remove('is_active_btn');
    return;
  } else if (dataName === 'queue') {
    refs.watchedBtn.classList.remove('is_active_btn');
    refs.queueBtn.classList.add('is_active_btn');
    return;
  }

  refs.headerBack.classList.toggle('back_library');
  refs.libraryBtn.classList.toggle('is_active');
  refs.homeBtn.classList.toggle('is_active');
  refs.headerForm.classList.toggle('is_invisible');
  refs.watchedBtn.classList.toggle('visually-hidden');
  refs.queueBtn.classList.toggle('visually-hidden');
  refs.headerForm.classList.toggle('visually-hidden');
  refs.trendingBtn.classList.toggle('visually-hidden');
  refs.popularBtn.classList.toggle('visually-hidden');
  refs.topRatedBtn.classList.toggle('visually-hidden');
  refs.upcomingBtn.classList.toggle('visually-hidden');
}

/*обработчик клика на кнопки запроса данных по категориям*/
const activateSelectionCathegoryBtnsContainer = e => {
  if (e.target.nodeName !== 'BUTTON') return;
  const buttonsArray = [...e.target.parentNode.children];
  buttonsArray.forEach(elem => {
    elem.classList.remove('is-active');
  });
  e.target.classList.add('is-active');
  const currentButton = e.target.dataset.name;
  makeGalleryFromFilmsByCathegory(currentButton);
};
