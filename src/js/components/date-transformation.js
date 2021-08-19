//принимает массив фильмов, изменяет дату релиза на год релиза
export const dateTransformation = function (array) {
  array.map(object => {
    if (object.release_date !== "") {
      object.release_date = Number.parseInt(object.release_date);
    } else {
      object.release_date = "------";
    }
  });
};
