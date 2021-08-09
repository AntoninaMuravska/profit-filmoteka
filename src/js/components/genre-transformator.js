/* 
 * Функция трансформации жанров фильмов в читабельный вариант. В функцию передаеться 2 основных аргумента - 
 * объект фильмов для рендера и объект с жанрами. Для варианта с модалкой - необходимо передать еще 3 необязательный 
 * аргумент "all" для отображения больше 2 жанров.  
*/

const genresTransformation = (dataObj, genresObj, genresLimit = 2) => {
    const data = {...dataObj};
    const isUnlimit = (genresLimit === 'all') ? true : false;

    const genresChanging = (arr, { genres } = genresObj) => {
        const outputArr = [];
        for (let i = 0; i < arr.length; i += 1) {

            if (!isUnlimit) {
                if (i > genresLimit - 1) {
                    outputArr.push("Other");
                    break;
                }
                const currentGenre = genres.find(elem => elem.id === arr[i]);
                outputArr.push(currentGenre.name);
            } else {
                const currentGenre = genres.find(elem => elem.id ===  arr[i]);
                outputArr.push(currentGenre.name);
            }
        }
        return outputArr;
    };

    data.results.map(elem => { elem.genre_ids=genresChanging(elem.genre_ids,genresObj) });

    return data;
};

export default genresTransformation;