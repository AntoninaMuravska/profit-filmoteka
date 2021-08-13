import {Block, Notify} from 'notiflix';

const TIMEOUT = 3000;
Block.init({
    svgSize: "80px",
    svgColor: "#2835e3",
    fontFamily: "Roboto",
    useGoogleFont: true,
    backgroundColor: "transparent"
});


/*Функция показа "успешного" уведомления */
export const showSuccesMessage = message => {
    Notify.success(
        message,
        {
            timeout:TIMEOUT,
        }
    );
};


/*Функция показа уведомления об ошибке  */
export const showFailureMessage = message => {
    Notify.failure(
        message,
        {
            timeout: TIMEOUT,
        }
    );
};


/*Функция показа уведомления с предупреждением  */
export const showWarningMessage = message => {
    Notify.warning(
        message,
        {
            timeout: TIMEOUT,
        }
    );
};


/*Функция запуска loader-а  на указаном елементе */
export const enableLoader = (elemClassName,text) => {
    Block.standard(elemClassName, text);
};


/*Функция прекращения показа loader-а  */
export const disableLoader = (elemClassName) => {
    Block.remove(elemClassName);
};