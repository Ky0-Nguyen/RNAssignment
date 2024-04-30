import {find} from 'lodash';
import {makeAutoObservable} from 'mobx';
import {MovieReviewType, MovieType} from './types';

class MovieStore {
  movieList: MovieType[] = [];
  movieListSearch: MovieType[] = [];
  genreList: any[] = [];

  movieDetail: MovieType | undefined;

  movieReviews: MovieReviewType[] = [];

  loading: boolean = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setMovieList = (newValue: any[]): void => {
    this.movieList = newValue;
  };

  setMovieListSearch = (newValue: any[]): void => {
    this.movieListSearch = newValue;
  };

  setGenreList = (newValue: any[]): void => {
    this.genreList = newValue;
  };

  setLoading = (newValue: boolean) => {
    this.loading = newValue;
  };

  setError = (newValue: string | null) => {
    this.error = newValue;
  };

  setMovieDetail = (newValue: MovieType) => {
    this.movieDetail = newValue;
  };

  setMovieReview = (newValue: MovieReviewType[]) => {
    this.movieReviews = newValue;
  };

  get listHandled() {
    const listHandled = () => {
      const arrTemp = [];
      for (let index = 0; index < this.movieList.length; index++) {
        const element = this.movieList[index];
        const genreIds = element?.genre_ids ?? [];
        const arrGenre = [];
        for (let i = 0; i < genreIds.length; i++) {
          const genre = genreIds[i];
          const genreFound = find(this.genreList, o => o.id === genre);
          arrGenre.push(genreFound?.name);
        }
        arrTemp.push({...element, genre_ids: arrGenre});
      }
      return arrTemp;
    };
    return listHandled();
  }
}

const movieStore = new MovieStore();
export {MovieStore, movieStore};
