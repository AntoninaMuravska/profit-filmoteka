const saveGenres = function (key, genres) {
  sessionStorage.setItem(key, JSON.stringify(genres));
};

const getItem = function (key) {
  return JSON.parse(sessionStorage.getItem(key));
};

//массив обьектов фильмов добавляет в sessionStorage
const saveFilmItem = function (key, array) {
  sessionStorage.setItem(key, JSON.stringify(array));
};

//добавляет массив обьектов фильмов поиска, если есть в SS такой ключ,
// тогда новый результат поиска добавляет к существуюющему
const saveSerchFilmItem = function (key, array) {
  const arraySessionStorage = [];
  if (getItem(key)) {
    arraySessionStorage.push(...getItem(key));
    arraySessionStorage.push(...array);
    sessionStorage.setItem(key, JSON.stringify(arraySessionStorage));
    return;
  }
  sessionStorage.setItem(key, JSON.stringify(array));
};

export { saveGenres, getItem, saveFilmItem, saveSerchFilmItem };
