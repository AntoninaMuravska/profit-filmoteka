import { addBackToTop } from 'vanilla-back-to-top';

const scrollUpInit = () => {
    const settings = {
        diameter: 56,
        backgroundColor: '#ff6b01',
        textColor: '#fff',
        scrollDuration: 400, // ms
        showWhenScrollTopIs: 500, // px
        // cornerOffset: 20, // px
        // ease: inOutSine, // any one from https://www.npmjs.com/package/ease-component will do
        // id: 'back-to-top',
        // innerHTML:
        //   '<svg viewBox="0 0 24 24"><path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>',
        // onClickScrollTo: 0, // px
        // scrollContainer: document.body, // or a DOM element, e.g., document.getElementById('content')
        // size: diameter, // alias for diameter
        // zIndex: 1,
    };

    addBackToTop(settings);
};

export default scrollUpInit;