import Pagination from 'tui-pagination';
import refs from './refs';


/*Функция инициализации пагинации */
export const paginationInit = totalItems => {
    
  const optionsTemplate = {
    totalItems: totalItems,
    itemsPerPage:20,
    visiblePages: 5,
    page: 1,
    centerAlign: false
  };

  const windowWidth = document.documentElement.clientWidth;
  if (windowWidth < 768) {
    optionsTemplate.visiblePages = 3;
  }

  const pagination = new Pagination('pagination', optionsTemplate);

  if (windowWidth < 768) {
    const lastBtnRef = document.querySelector('.tui-page-btn.tui-last');
    const firstBtnRef = document.querySelector('.tui-page-btn.tui-first');
    
    [firstBtnRef, lastBtnRef].forEach(elem=>elem.classList.add('visually-hidden'));
  }

  return pagination;
};


/* Функция скрытия строки пагинации*/
export const paginationBarShow = () => {
  refs.paginationBar.classList.remove('is-notvisible');
};


/* Функция показа строки пагинации*/
export const paginationBarHide = () => {
  refs.paginationBar.classList.add('is-notvisible');
};

