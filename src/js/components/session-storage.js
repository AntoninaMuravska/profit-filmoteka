const saveGenres = function (key, genres) {
  sessionStorage.setItem(key, JSON.stringify(genres));
};

const getGenres = function (key) {
  return sessionStorage.getItem(key);
};

export { saveGenres, getGenres };
