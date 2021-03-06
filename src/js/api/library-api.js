/*клас для работы с библиотекой пользователя в localStorage */
export default class LibraryApi {
    constructor() {
        this.page = 1;
        this.isEndStatus = false;
        this.activeLibrary = null;
    }


    /*метод для получения данных из указанной библиотеки в localStorage*/
    getData(libraryType) {
        const storageData = localStorage.getItem(libraryType);

        if (storageData) {
            try {
                return JSON.parse(storageData);
            } catch (error) {
                console.error("Get state error: ", error.message);
            }
        }

        return null;
    }


    /*метод для записи елемента в указанную библиотеку в localStorage*/
    setData(data, libraryType) {
        const STORAGE_DATA_TMP = {
            library: [],
            total_pages: 1,
            total_results:1
        };

        let storageData = this.getData(libraryType);

        if (storageData) {
            storageData.library.push(data);
            storageData.total_results += 1;
            storageData.total_pages = Math.ceil(storageData.total_results / 20);
        } else {
            storageData = { ...STORAGE_DATA_TMP };
            storageData.library.push(data);
        }

        localStorage.setItem(libraryType,JSON.stringify(storageData));
    }


    /*метод для удаления елемента из указанной библиотеки в localStorage*/
    removeData(filmId, libraryType) {
        const storageData = this.getData(libraryType);

        if (!storageData || storageData.total_results===0) {
            return;
        }
        
        const isFound=storageData.library.find((el, idx) => {
            if (el.id !== filmId) return false;
            
            storageData.library.splice(idx, 1);
            storageData.total_results -= 1;
            storageData.total_pages = Math.ceil(storageData.total_results / 20);
            return true;
        });

        if (!isFound) {
            return;
        }
        localStorage.setItem(libraryType,JSON.stringify(storageData));
    }


    /*
     * Метод для получение порции елементов из библиотеки. По дефолту - до 20 шт.
     * Для получения определенного количества надо передать аргумент с количеством
    */
    fetchData(quantity = 20) {
        const storageData = this.getData(this.activeLibrary);

        if (!storageData || storageData.total_results===0) {
            return null;
        }

        const outputData = {
            page: this.page,
            results: [...storageData.library.slice(((this.page - 1) * quantity), (this.page - 1) * quantity + quantity)],
            total_pages: storageData.total_pages,
            total_results: storageData.total_results
        };
        
        return JSON.stringify(outputData);
    }


    /*
     * Метод для получение конкретной порции елементов из библиотеки. 
     * Принимает аргумент с запрашиваемой страничкой и количество елементов( дефолту - до 20 шт)
    */
    fetchDataByPage(page = 1, quantity=20) {
        const storageData = this.getData(this.activeLibrary);

        if (!storageData || storageData.total_results===0) {
            return null;
        }

        const outputData = {
            page: this.page,
            results: [...storageData.library.slice(((page - 1) * quantity), (page - 1) * quantity + quantity)],
            total_pages: storageData.total_pages,
            total_results: storageData.total_results
        };
        
        return JSON.stringify(outputData);
    }



    /*метод для проверки наличия фильма в библиотеке пользователя*/
    availabilityChecking(filmId) {
        const library = {
            0: "watched",
            1: "queue"
        }

        const keys = Object.keys(library);
        let isAvailable = false;
        let sourceLibrary = null;
        
        for (const key of keys) {
            const storageData = this.getData(library[key]);

            if (!storageData || storageData.total_results===0) {
                continue;
            }

            storageData.library.find(el => {
                if (el.id !== filmId) return false;
                isAvailable = true;
                sourceLibrary = library[key];
                return true;
            });

            if (isAvailable) {
                return { isAvailable, sourceLibrary };
            }
        };

        return { isAvailable, sourceLibrary };
    }    


    /*метод для увеличения значения страницы для пагинации*/
    incrementPage() {
        this.page += 1;
    }

    /*метод для сброса текущей страницы для пагинации*/
    resetPage() {
        this.page = 1;
    }

    /*метод для фиксации названия активной библиотеки*/
    setActiveLibrary(libraryName) {
        this.activeLibrary = libraryName;
    }

    /*метод для определения окончания объектов в библиотеке*/
    setEndStatus() {
        this.isEndStatus = true;
    }

    /*метод для сброса значения указывающего на окончание объектов в библиотеке*/
    resetEndStatus() {
        this.isEndStatus = false;
    }


    /*метод для получения елемента из указанной библиотеки в localStorage*/
    getItem(filmId, libraryType) {
        const storageData = this.getData(libraryType);

        if (!storageData || storageData.total_results===0) {
            return;
        }
        
    const item = storageData.library.find(el => el.id === filmId);
    
        if (!item) {
            return null;
        }
        return item;
    }
}


