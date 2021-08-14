import axios from 'axios';
import { saveGenres, saveFilms, savePopularFilms } from '../components/session-storage';

export default class MovieApi {
  constructor() {
    this.API_KEY = '16793a08fc468099c942dee45d510578';
    this.BASE_URL = 'https://api.themoviedb.org/3/';
    this.genres = {};
    this.moviesObj = {};
    this.currentPage = 1;
    this.rows = 20;
    this.query = '';

    // this.VIDEO_BASE_URL = 'https://api.themoviedb.org/3/movie/';
    // this.IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/';

    //нужно поставить дефолтные картинки, если нет постера
    // this.DEFAULT_IMAGE = '';    ======= для галереи фильмов
    // this.DEFAULT_POSTER = '';   ======= постер для окна с деталями
  }

  //популярные фильмы на сегодня
  async getTrendingMovies() {
    const response = await axios.get(`${this.BASE_URL}trending/movie/day?api_key=${this.API_KEY}`);
    const movies = response.data.results;
    this.moviesObj = response.data;

    savePopularFilms(this.moviesObj);
    saveFilms(this.moviesObj.results);
    return movies;
  }
  //поиск фильма
  async searchMovies(query) {
    console.log(query)
    const response = await axios.get(
      `${this.BASE_URL}search/movie?query=${query}&api_key=${this.API_KEY}&language=en-US&page=${this.currentPage}&include_adult=false`,
    );
    const movies = response.data.results;
    this.moviesObj = response.data;
    console.log(movies);
    saveFilms(movies);
    return movies;
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

  resetPage() {
    return (this.currentPage = 1);
  }


}

// Тестовые запросы
// const MyApi = new MovieApi();
// MyApi.getTrendingMovies();
// MyApi.searchMovies('soul');
// MyApi.movieDetails(550);
// MyApi.genresList();
