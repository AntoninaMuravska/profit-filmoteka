import axios from 'axios';
import { saveGenres, saveFilms, savePopularFilms } from '../components/session-storage';

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

  async getTrendingMovies(page) {
    const response = await axios.get(
      `${this.BASE_URL}trending/movie/day?api_key=${this.API_KEY}&page=${page}`,
    );
    const fetchData = response.data;
    savePopularFilms(fetchData); //============ переименовать на saveTrendingFilms
    saveFilms(fetchData.results);
    return fetchData;
  }

  //поиск фильма
  async searchMovies(page) {
    const response = await axios.get(
      `${this.BASE_URL}search/movie?query=${this.query}&api_key=${this.API_KEY}&language=en-US&page=${page}&include_adult=false`,
    );
    const fetchData = response.data;
    this.moviesObj = fetchData;
    saveFilms(fetchData.results);
    return fetchData;
  }

  //детали фильма
  async movieDetails(movie_id) {
    const response = await axios.get(
      `${this.BASE_URL}movie/${movie_id}?api_key=${this.API_KEY}&language=en-US`,
    );
    const data = response.data;
    return data;
  }

  //жанры
  async genresList() {
    const response = await axios.get(`
      ${this.BASE_URL}genre/movie/list?api_key=${this.API_KEY}&language=en-US`);
    const data = response.data;
    this.genres = data;
    saveGenres(data);
    return this.genres;
  }

  //популярные фильмы
  async getPopularMovies(page) {
    const response = await axios.get(
      `${this.BASE_URL}movie/popular?api_key=${this.API_KEY}&language=en-US&page=${page}`,
    );
    const fetchData = response.data;
    // savePopularFilms(fetchData); =========== СОЗДАТЬ функцию для сохранения фильмов в СС
    saveFilms(fetchData.results);
    return fetchData;
  }

  //новинки
  async getUpcomingMovies(page) {
    const response = await axios.get(
      `${this.BASE_URL}movie/upcoming?api_key=${this.API_KEY}&language=en-US&page=${page}`,
    );
    const fetchData = response.data;
    // saveUpcomingFilms(fetchData); =========== СОЗДАТЬ функцию для сохранения фильмов в СС
    saveFilms(fetchData.results);
    return fetchData;
  }

  //фильмы по рейтингу
  async getTopRatedMovies(page) {
    const response = await axios.get(
      `${this.BASE_URL}movie/top_rated?api_key=${this.API_KEY}&language=en-US&page=${page}`,
    );
    const fetchData = response.data;
    // saveTopRatedFilms(fetchData); =========== СОЗДАТЬ функцию для сохранения фильмов в СС
    saveFilms(fetchData.results);
    return fetchData;
  }

  //список актеров по id фильма - добавить в карточку с деталями
  async movieCast(movie_id) {
    const response = await axios.get(
      `${this.BASE_URL}movie/${movie_id}/credits?api_key=${this.API_KEY}&language=en-US`,
    );
    const fetchData = response.data;
    return fetchData;
  }

  searchQuery(query) {
    return (this.query = query);
  }

  resetPage() {
    return (this.page = 1);
  }
}

// Тестовые запросы
// const MyApi = new MovieApi();
