const saveGenres = function (key, genres) {
  sessionStorage.setItem(key, JSON.stringify(genres));
};

const getItem = function (key) {
  return sessionStorage.getItem(key);
};

//принимает масив обьектов фильмов, каждый фильм добавляет в sessionStorage
//ключ - ID фильма, значение - весь обьект фильма (потом при запросе по ID фильма, можно получить обьект фильма)
const saveFilmItem = function (array) {
  array.map(elem => sessionStorage.setItem(elem.id, JSON.stringify(elem)));
};

export { saveGenres, getItem, saveFilmItem };
