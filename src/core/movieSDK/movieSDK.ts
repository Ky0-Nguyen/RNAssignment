import Fuse from 'fuse.js';
import {get} from 'lodash';
import {MovieStore} from './movieStore';
import {
  fetchGenreList,
  fetchMovieDetail,
  fetchMovieList,
  fetchMovieReviews,
} from './api';

const options = {
  includeScore: true,
  // Search in `title` and in `genre_ids` array
  keys: ['title', 'genre_ids'],
};

class MovieSDK {
  movieStore: MovieStore;

  constructor() {
    this.movieStore = new MovieStore();
  }

  fetchMovies = async () => {
    this.movieStore.setLoading(true);
    try {
      const res = await fetchMovieList();
      const responseGenre = await fetchGenreList();
      this.movieStore.setMovieList(get(res, 'results'));
      this.movieStore.setGenreList(get(responseGenre, 'genres'));
    } catch (error: any) {
      this.movieStore.setError(error.message);
    } finally {
      this.movieStore.setLoading(false);
    }
  };

  fetchMovieDetail = async (movieId: string) => {
    this.movieStore.setLoading(true);
    try {
      const res = await fetchMovieDetail(movieId);
      const resReviews = await fetchMovieReviews(movieId);
      this.movieStore.setMovieDetail(res);
      this.movieStore.setMovieReview(resReviews?.results ?? []);
    } catch (error: any) {
      this.movieStore.setError(error.message);
    } finally {
      this.movieStore.setLoading(false);
    }
  };

  searchMovies = (text: string) => {
    const fuse = new Fuse(this.movieStore.listHandled, options);
    const result = fuse.search(text);
    this.movieStore.setMovieListSearch(result);
  };
}
const movieSDK = new MovieSDK();
export {MovieSDK, movieSDK};
