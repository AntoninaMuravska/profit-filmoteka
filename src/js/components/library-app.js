import LibraryApi from '../api/library-api';

const library = new LibraryApi();

/*Временные тестовые данные*/
import singleFilmObj from '../../json/example-single-film-data';
// const filmId = 436969;


/* 
 * Обработчик клика на контейнер с кнопками (делегирование) ADD TO WATCH и ADD TO QUEUE в модалке.
 * Кнопкам добавить атрибуты data-name="watched" и data-name="queue" соответственно и
 * data-active="true".
*/
export const onButtonLibraryContainerClick = e => {
    const elem = e.target;
    
    const isLibraryBtns = e.target.dataset.name === 'watched' || e.target.dataset.name === 'queue';

    if (elem.nodeName!=='BUTTON' || !isLibraryBtns) {
        return;
    }

    const libraryBtns = {
        watched: e.target.parentNode.querySelector('[data-name="watched"]'),
        queue: e.target.parentNode.querySelector('[data-name="queue"]')
    };

    const filmId=Number(e.target.dataset.id);
    let librarySource;
    let nonTargetBtn;
    
    if (elem.dataset.name === 'watched') {
        librarySource = 'watched';
        nonTargetBtn = libraryBtns.queue;
    } else {
        librarySource = 'queue';
        nonTargetBtn = libraryBtns.watched;
    }
         
    const isActive = elem.dataset.active;

    if (isActive === 'true') {
        library.setData(singleFilmObj, librarySource);
        elem.dataset.active = 'false';
        elem.textContent = 'remove from ' + librarySource;
        nonTargetBtn.setAttribute('disabled','');
    } else {
        library.removeData(filmId, librarySource);
        elem.dataset.active = 'true';
        elem.textContent = 'add to ' + librarySource;
        nonTargetBtn.removeAttribute('disabled');
    }
};


/* 
 * Обработчик клика на кнопки WATCHED и QUEUE. Вешается по клику на каждую из кнопок.
 * получает первые 20 елементов из библиотеки или оповещает об их отсутствии.
*/
export const onLibraryButtonClick = e => {
    const elem = e.currentTarget;
    
    library.setActiveLibrary(elem.dataset.name);
    library.resetPage();
    library.resetEndStatus();
    
    let data = null;
    try {
        data = JSON.parse(library.fetchData());
    } catch (error) {
        console.error(error);
    }
        
    if (!data) {
        alert('No elements found!');
        return;
    }
    
    if (data.page === data.total_pages) {
        alert('You get the last one!');
        library.setEndStatus();
    }

    library.incrementPage();
    // console.log(data);
};


/* 
 * Функция для реализации пагинации. Подтягивает следующие 20 елементов из активной библиотеки.
*/
export const loadMoreItems = () => {
    
    if (library.isEndStatus) {
        alert('no more items!!');
        return;
    }

    let data = null;
    try {
        data = JSON.parse(library.fetchData());
    } catch (error) {
        console.error(error);
    }
    
    if (!data) {
        alert('No elements found!');
        return;
    }
    
    if (data.page === data.total_pages) {
        alert('You get the last one!');
        library.setEndStatus();
    }

    library.incrementPage();
    // console.log(data);
};


/* 
 * Функция для автозапуска при открытии модалки. Проверяет библиотеку на наличие 
 * текущего фильма по id и производит настройку кнопок модалки для корректного отображения 
 * и функционирования. В функцию необходимо передать ссылки на кнопки.
*/
export const onModalOpenAutorun = (watchBtnLink, queueBtnLink, filmId) => {
    const checkingResult = library.availabilityChecking(filmId);
    
    // switch (checkingResult.isAvailable) {
    //      case false:
    //         for (const elem of [watchBtnLink, queueBtnLink]) {
    //             elem.dataset.active = "true";
    //             elem.removeAttribute("disabled");
    //             // elem.textContent = 'KOKOKO';
    //         }
    //         break;
    //     case true:
    //         if (checkingResult.sourceLibrary === 'watched') {
    //             watchBtnLink.dataset.active = "false";
    //             watchBtnLink.removeAttribute("disabled");
    //             watchBtnLink.textContent="Delete from watched"
    //             queueBtnLink.dataset.active = "true";
    //             queueBtnLink.setAttribute("disabled", "");
    //         } else {
    //             queueBtnLink.dataset.active = "false";
    //             queueBtnLink.removeAttribute("disabled");
    //             watchBtnLink.textContent="Delete from queue"
    //             watchBtnLink.dataset.active = "true";
    //             watchBtnLink.setAttribute("disabled", "");
    //         }
    //         break;
    // }

    if (checkingResult.isAvailable) {
        if (checkingResult.sourceLibrary === 'watched') {
            watchBtnLink.dataset.active = "false";
            watchBtnLink.removeAttribute("disabled");
            watchBtnLink.textContent="Remove from watched"
            queueBtnLink.dataset.active = "true";
            queueBtnLink.setAttribute("disabled", "");
        } else {
            queueBtnLink.dataset.active = "false";
            queueBtnLink.removeAttribute("disabled");
            queueBtnLink.textContent="Remove from queue"
            watchBtnLink.dataset.active = "true";
            watchBtnLink.setAttribute("disabled", "");
        }
    }
};