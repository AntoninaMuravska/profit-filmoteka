import refs from './components/refs';
import { onGalleryItemClick } from './components/gallery';


refs.filmCardRef.addEventListener('click', onGalleryItemClick);
refs.homeBtn.addEventListener('click', onHomeBtnClick);
refs.libraryBtn.addEventListener('click', onLibraryBtnClick);
refs.searchBtn.addEventListener('click', onSearchBtn);
refs.queueBtn.addEventListener('click', onQueueBtnClick);
refs.watchedBtn.addEventListener('click', onWatchedBtnClick);

function onHomeBtnClick(e) {
  e.preventDefault();
  refs.headerBack.classList.remove('back_library');
  refs.libraryBtn.classList.remove('is_active');
  refs.homeBtn.classList.add('is_active');
  refs.headerForm.classList.remove('is_invisible');
  refs.watchedBtn.classList.add('is_invisible');
  refs.queueBtn.classList.add('is_invisible');

  //убирает рейтинг на страничке home
  const ratings = document.querySelectorAll('.rating');
  if (!refs.libraryBtn.classList.contains('is_active')) {
    ratings.forEach(rating => rating.classList.add('visually-hidden'));
  }
  
}

function onLibraryBtnClick(e) {
  e.preventDefault();
  refs.headerBack.classList.add('back_library');
  refs.libraryBtn.classList.add('is_active');
  refs.homeBtn.classList.remove('is_active');
  refs.headerForm.classList.add('is_invisible');
  refs.watchedBtn.classList.remove('is_invisible');
  refs.watchedBtn.classList.add('is_active_btn');
    refs.queueBtn.classList.remove('is_invisible');
    refs.queueBtn.classList.remove('is_active_btn');
console.log('клик по my library');
  //добавляет рейтинг на страничке библиотеки
  const ratings = document.querySelectorAll('.rating');
  if (refs.libraryBtn.classList.contains('is_active')) {
    ratings.forEach(rating => rating.classList.remove('visually-hidden'));
  }
  
}

function onSearchBtn(e) {
  e.preventDefault();
  console.log('клик по кнопке search');
}

function onQueueBtnClick(e) {
  e.preventDefault();
  refs.watchedBtn.classList.remove('is_active_btn');
  refs.queueBtn.classList.add('is_active_btn');
}

function onWatchedBtnClick(e) {
  e.preventDefault();
  refs.watchedBtn.classList.add('is_active_btn');
  refs.queueBtn.classList.remove('is_active_btn');
}