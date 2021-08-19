/*
 * Функция трансформации жанров фильмов в читабельный вариант. В функцию передаеться 2 основных аргумента -
 * объект фильмов для рендера и объект с жанрами. Для варианта с модалкой - необходимо передать еще 3 необязательный
 * аргумент "all" для отображения больше 2 жанров.
 */

const genresTransformation = (dataObj, genresObj, genresLimit = 2) => {
  const data = { ...dataObj };
  console.log(data);
  const isUnlimit = genresLimit === 'all' ? true : false;

  const genresChanging = (arr, { genres } = genresObj) => {
    const outputArr = [];
    for (let i = 0; i < arr.length; i += 1) {
      if (i > genresLimit - 1) {
        outputArr.push('Other');
        break;
      }
      const currentGenre = genres.find(elem => elem.id === arr[i]);

      if (currentGenre) {
        outputArr.push(currentGenre.name);
      } else {
        outputArr.push('some');
      }
    }
    return outputArr;
  };

  if (!isUnlimit) {
    data.results.map(elem => {
      if (elem.genre_ids.length === 0){
        elem.genre_ids = "Unknown";
      } else {
        elem.genre_ids = genresChanging(elem.genre_ids, genresObj).join(', ');
      }
    });
  } else {
    if (data.genres.length === 0) {
      data.genres = "Unknown";
    } else {
      data.genres = [...data.genres].map(elem => elem.name).join(', ');
    }
  }

  return data;
};

export default genresTransformation;
