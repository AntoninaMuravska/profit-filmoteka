export const dateTransformation = function (array) {
  array.map(object => {
    object.release_date = Number.parseInt(object.release_date);
  });
};