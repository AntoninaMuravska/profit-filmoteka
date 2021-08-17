import axios from 'axios';
import { saveGenres, saveFilms, savePopularFilms } from '../components/session-storage';
// import Pagination from 'tui-pagination';
// import options from '../../js/components/pagination';
// import renderGallary from '../../js/components/gallery';
// const pagination = new Pagination('pagination', options);
// const page = pagination.getCurrentPage;

//  pagination.on('afterMove', (event) => {
//    MovieApi.currentPage = event.page;
//    console.log(MovieApi.currentPage);
//    const MyApi = new MovieApi();
//    MovieApi.getTrendingMovies();
// });

export default class MovieApi {
  constructor() {
    this.API_KEY = '16793a08fc468099c942dee45d510578';
    this.BASE_URL = 'https://api.themoviedb.org/3/';
    this.genres = {};
    this.moviesObj = {};
    this.page = 1;
    this.query = '';

    // this.VIDEO_BASE_URL = 'https://api.themoviedb.org/3/movie/';
    this.IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    //нужно поставить дефолтные картинки, если нет постера
    this.DEFAULT_POSTER = 'https://clipartmag.com/images/old-camera-clipart-27.jpg';
    // this.DEFAULT_POSTER = '';   ======= постер для окна с деталями
  }

  //популярные фильмы на сегодня
  // async getTrendingMovies() {
  //   console.log(this.currentPage);
  //   const response = await axios.get(`${this.BASE_URL}trending/movie/day?api_key=${this.API_KEY}&page=${this.currentPage}`);
  //   // pagination.reset(response.data.total_results);
  //   const movies = response.data.results;
  //   this.moviesObj = response.data;
  //   movies.map(el => {
  //     const posterImageExist = el.poster_path;
  //     el.poster_path = MyApi.IMAGE_BASE_URL + el.poster_path;

  //     if (!posterImageExist) {
  //       el.poster_path = MyApi.DEFAULT_POSTER;
  //     }
  //   });

  //   savePopularFilms(this.moviesObj);
  //   saveFilms(this.moviesObj.results);
  //   return movies;
  // }

  async getTrendingMovies(page) {
    const response = await axios.get(
      `${this.BASE_URL}trending/movie/day?api_key=${this.API_KEY}&page=${page}`,
    );
    const fetchData = response.data;
    // console.log('проверка получения данных с сервера ', fetchData);

  //async getTrendingMovies() {
    //const response = await axios.get(
      //`${this.BASE_URL}trending/movie/day?api_key=${this.API_KEY}&page=${this.currentPage}`,
    //);
    //const fetchData = response.data;
    //console.log('проверка получения данных с сервера ', fetchData);

    // pagination.reset(response.data.total_results);
    // this.moviesObj = response.data;

    // movies.map(el => {
    //   const posterImageExist = el.poster_path;
    //   el.poster_path = MyApi.IMAGE_BASE_URL + el.poster_path;

    //   if (!posterImageExist) {
    //     el.poster_path = MyApi.DEFAULT_POSTER;
    //   }
    // });

    savePopularFilms(fetchData);
    saveFilms(fetchData.results);
    return fetchData;
  }

  //поиск фильма
  async searchMovies(page) {
    const response = await axios.get(`${this.BASE_URL}search/movie?query=${this.query}&api_key=${this.API_KEY}&language=en-US&page=${page}&include_adult=false`);
    const fetchData = response.data;

    // const movies = response.data;
    
    this.moviesObj = fetchData;
    // console.log(movies);
    // movies.map(el => {
    //   const posterImageExist = el.poster_path;
    //   el.poster_path = MyApi.IMAGE_BASE_URL + el.poster_path;
    //   if (!posterImageExist) {
    //     el.poster_path = MyApi.DEFAULT_POSTER;
    //   }
    // });
    saveFilms(fetchData.results);
    return fetchData;
  }

  //детали фильма
  async movieDetails(movie_id) {
    const response = await axios.get(
      `${this.BASE_URL}movie/${movie_id}?api_key=${this.API_KEY}&language=en-US`,
    );
    const data = response.data;
    // console.log(data);
    return data;
  }

  //жанры
  async genresList() {
    const response = await axios.get(`
      ${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}&language=en-US`);
    const data = response.data;

    //   console.log(data);
    this.genres = data;

    saveGenres(data);
    return this.genres;
  }

  searchQuery(query) {
    return (this.query = query);
  }

  resetPage() {
    return (this.page = 1);
  }

}

// Тестовые запросы
const MyApi = new MovieApi();
// MyApi.getTrendingMovies();
// MyApi.searchMovies('soul');
// MyApi.movieDetails(550);
// MyApi.genresList();
