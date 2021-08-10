const input = document.querySelector('[class="header__input"]');
const searchBtn = document.querySelector('[class="header__button"]');
const homeBtn = document.querySelector('[data-name="home"]');
const libraryBtn = document.querySelector('[data-name="library"]');
const headerBack = document.querySelector('[class="header"]');
const headerForm = document.querySelector('[class="header__form"]');
const watchedBtn = document.querySelector('[data-name="watched"]');
const queueBtn = document.querySelector('[data-name="queue"]');
// const headerLibBtns = document.querySelector('[header__library]');

homeBtn.addEventListener('click', onHomeBtnClick);
libraryBtn.addEventListener('click', onLibraryBtnClick);
searchBtn.addEventListener('click', onSearchBtn);
queueBtn.addEventListener('click', onQueueBtnClick);
watchedBtn.addEventListener('click', onWatchedBtnClick);

function onHomeBtnClick(e) {
  e.preventDefault();
  headerBack.classList.remove('back_library');
  libraryBtn.classList.remove('is_active');
  homeBtn.classList.add('is_active');
  headerForm.classList.remove('is_invisible');
  watchedBtn.classList.add('is_invisible');
  queueBtn.classList.add('is_invisible');

  //убирает рейтинг на страничке home
  const ratings = document.querySelectorAll('.rating');
  if (!libraryBtn.classList.contains('is_active')) {
    ratings.forEach(rating => rating.classList.add('visually-hidden'));
  }
  //
  console.log('клик по кнопке home');
}

function onLibraryBtnClick(e) {
  e.preventDefault();
  headerBack.classList.add('back_library');
  libraryBtn.classList.add('is_active');
  homeBtn.classList.remove('is_active');
  headerForm.classList.add('is_invisible');
  watchedBtn.classList.remove('is_invisible');
  watchedBtn.classList.add('is_active_btn');
  queueBtn.classList.remove('is_invisible');

  //добавляет рейтинг на страничке библиотеки
  const ratings = document.querySelectorAll('.rating');
  if (libraryBtn.classList.contains('is_active')) {
    ratings.forEach(rating => rating.classList.remove('visually-hidden'));
  }
  //
  console.log();
  console.log('клик по кнопке library');
}

function onSearchBtn(e) {
  e.preventDefault();
  console.log('клик по кнопке search');
}

function onQueueBtnClick(e) {
  e.preventDefault();
  watchedBtn.classList.remove('is_active_btn');
  queueBtn.classList.add('is_active_btn');
}

function onWatchedBtnClick(e) {
  e.preventDefault;
  watchedBtn.classList.add('is_active_btn');
  queueBtn.classList.remove('is_active_btn');
}
