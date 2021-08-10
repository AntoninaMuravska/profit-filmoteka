import './sass/main.scss';

import refs from './js/components/refs';
import onGalleryItemClick from './js/components/gallery';

refs.filmCardRef.addEventListener('click',onGalleryItemClick);