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

/* Функция скрытия строки пагинации при 1 страничке*/
export const isOnlyOnePage = (paginationItem) => {
  let checkResult = false;
  if (paginationItem._options.totalItems <= 20) {
    checkResult = true;
  }
  return checkResult;
};