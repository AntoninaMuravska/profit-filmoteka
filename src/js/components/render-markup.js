/*Функция добавления разметки в переданный елемент*/
export const appendMarkup = (elem,data) => {
    elem.insertAdjacentHTML('beforeend', data);
};

/*Функция очистки галлереи*/
export const clearMarkup = (elem) => {
    elem.innerHTML = '';
};