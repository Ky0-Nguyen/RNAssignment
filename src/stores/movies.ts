import {makeAutoObservable} from 'mobx';

class MovieStore {
  movieList: any[] = [];
  movieListSearch: any[] = [];
  genreList: any[] = [];

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
}
export {MovieStore};
