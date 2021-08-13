import {Block, Notify} from 'notiflix';

Block.init({
    svgSize: "80px",
    svgColor: "#2835e3",
    fontFamily: "Roboto",
    useGoogleFont: true,
    backgroundColor: "transparent"
});

Notify.init({
    width: '240px',
    position: 'right-bottom',
    timeout: 3000,
    distance: '10px',
    opacity: 1,
    borderRadius: '5px',
    rtl: false,
    messageMaxLength: 110,
    backOverlay: false,
    backOverlayColor: 'rgba(0,0,0,0.5)',
    plainText: true,
    showOnlyTheLastOne: false,
    clickToClose: false,
    pauseOnHover: true,
    ID: 'NotiflixNotify',
    className: 'notiflix-notify',
    zindex: 4001,
    useGoogleFont: false,
    fontFamily: 'Quicksand',
    fontSize: '13px',
    cssAnimation: true,
    cssAnimationDuration: 350,
    cssAnimationStyle: 'fade',
    closeButton: false,
    useIcon: true,
    useFontAwesome: false,
    fontAwesomeIconStyle: 'basic',
    fontAwesomeIconSize: '34px',
});

/*Функция показа "успешного" уведомления */
export const showSuccesMessage = message => {
    Notify.success(message);
};


/*Функция показа уведомления об ошибке  */
export const showFailureMessage = message => {
    Notiflix.Notify.Failure(message);
};


/*Функция показа уведомления с предупреждением  */
export const showWarningMessage = message => {
    Notify.warning(message);
};


/*Функция запуска loader-а  на указаном елементе */
export const enableLoader = (elemClassName,text) => {
    Block.standard(elemClassName, text);
};


/*Функция прекращения показа loader-а  */
export const disableLoader = (elemClassName) => {
    Block.remove(elemClassName);
};