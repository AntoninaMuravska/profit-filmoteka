const saveGenres = function (genres) {
  sessionStorage.setItem('genres', JSON.stringify(genres));
};

const getItemFromSessionStorage = function (key) {
  return JSON.parse(sessionStorage.getItem(key));
};

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

export { saveGenres, saveFilms, getFilm, getGenres, getItemFromSessionStorage };
