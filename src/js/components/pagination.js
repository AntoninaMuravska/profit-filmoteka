import Pagination from 'tui-pagination';

export const paginationInit = totalItems => {
  const optionsTemplate = {
    totalItems: totalItems,
    itemsPerPage:20,
    visiblePages: 5,
    page: 1,
    centerAlign: false
  };

  const pagination = new Pagination('pagination', optionsTemplate);
  return pagination;
};


// pagination.on('beforeMove', evt => {
//   const { page } = evt;
//   const result = ajax.call({page});

//   if(result) {
//     pagination.movePageTo(page);
//   } else {
//     return false;
//   }
// });

// pagination.on('afterMove', ({ page }) => console.log(page));



