/*Функция для записи объекта жанров в СС */
const saveGenres = function (genres) {
  sessionStorage.setItem('genres', JSON.stringify(genres));
};



/*Функция для получения елемента с СС по зананному имени ключа */
const getItemFromSessionStorage = function (key) {
  return JSON.parse(sessionStorage.getItem(key));
};



/*Функция для сохранения фильмов в СС */
const saveFilms = function (array, key) {
  const arraySessionStorage = [];

  if (!key) {
    key = 'movies';
  }
  if (getItemFromSessionStorage(key)) {
    arraySessionStorage.push(...getItemFromSessionStorage(key));

    array.map(film => {
      if (!arraySessionStorage.find(x => x.id === film.id)) {
        arraySessionStorage.push(film);
      }
    });

    sessionStorage.setItem(key, JSON.stringify(arraySessionStorage));
    return;
  }
  sessionStorage.setItem(key, JSON.stringify(array));
};



/*Функция для сохранения трендовых фильмов в СС */
const savePopularFilms = function (objFilms, key = 'popular') {
  const arraySessionStorage = [];
  const filmsPage = getItemFromSessionStorage(key);

  if (filmsPage) {
    arraySessionStorage.push(filmsPage);

    if (objFilms.page === filmsPage.page) {
      return;
    }
    arraySessionStorage.push(objFilms);
    sessionStorage.setItem(key, JSON.stringify(arraySessionStorage));
    return;
  }

  sessionStorage.setItem(key, JSON.stringify(objFilms));
};



/*Функция для получения одного фильма из СС */
const getFilm = function (id) {
  const films = sessionStorage.getItem('movies');
  if (films) {
    try {
      const availabilityFilm = JSON.parse(films).find(film => film.id === id);
      if (availabilityFilm) {
        return availabilityFilm;
      }
      console.log('Упс....такого нет (((');
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
  return null;
};



/*Функция для получения объекта с жанрами из СС */
const getGenres = function () {
  const genres = sessionStorage.getItem('genres');

  if (genres) {
    try {
      return JSON.parse(genres);
    } catch (error) {
      console.error('Get state error: ', error.message);
    }
  }
  return null;
};

export { saveGenres, saveFilms, savePopularFilms, getFilm, getGenres, getItemFromSessionStorage };
