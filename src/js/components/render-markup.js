/*Функция добавления разметки в указанный елемент*/
export const appendMarkup = (elem,data) => {
    elem.insertAdjacentHTML('beforeend', data);
};

/*Функция очистки разметки в указанном елементе*/
export const clearMarkup = elem => {
    elem.innerHTML = '';
};