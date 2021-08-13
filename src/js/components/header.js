// import refs from './refs';
// const input = document.querySelector('[class="header__input"]');
// const searchBtn = document.querySelector('[class="header__button"]');
// const homeBtn = document.querySelector('[data-name="home"]');
// const libraryBtn = document.querySelector('[data-name="library"]');
// const headerBack = document.querySelector('[class="header"]');
// const headerForm = document.querySelector('[class="header__form"]');
// const watchedBtn = document.querySelector('[data-name="watched"]');
// const queueBtn = document.querySelector('[data-name="queue"]');




// function onHomeBtnClick(e) {
//   e.preventDefault();
//   refs.headerBack.classList.remove('back_library');
//   refs.libraryBtn.classList.remove('is_active');
//   refs.homeBtn.classList.add('is_active');
//   refs.headerForm.classList.remove('is_invisible');
//   refs.watchedBtn.classList.add('is_invisible');
//   refs.queueBtn.classList.add('is_invisible');

//   //убирает рейтинг на страничке home
//   const ratings = document.querySelectorAll('.rating');
//   if (!refs.libraryBtn.classList.contains('is_active')) {
//     ratings.forEach(rating => rating.classList.add('visually-hidden'));
//   }
  
// }

// function onLibraryBtnClick(e) {
//   e.preventDefault();
//   refs.headerBack.classList.add('back_library');
//   refs.libraryBtn.classList.add('is_active');
//   refs.homeBtn.classList.remove('is_active');
//   refs.headerForm.classList.add('is_invisible');
//   refs.watchedBtn.classList.remove('is_invisible');
//   refs.watchedBtn.classList.add('is_active_btn');
//   refs.queueBtn.classList.remove('is_invisible');
// console.log('клик по my library');
//   //добавляет рейтинг на страничке библиотеки
//   const ratings = document.querySelectorAll('.rating');
//   if (refs.libraryBtn.classList.contains('is_active')) {
//     ratings.forEach(rating => rating.classList.remove('visually-hidden'));
//   }
  
// }

// function onSearchBtn(e) {
//   e.preventDefault();
//   console.log('клик по кнопке search');
// }

// function onQueueBtnClick(e) {
//   e.preventDefault();
//   refs.watchedBtn.classList.remove('is_active_btn');
//   refs.queueBtn.classList.add('is_active_btn');
// }

// function onWatchedBtnClick(e) {
//   e.preventDefault;
//   refs.watchedBtn.classList.add('is_active_btn');
//   refs.queueBtn.classList.remove('is_active_btn');
// }
