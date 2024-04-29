import {MovieStore} from './movies';

class AppStore {
  movie: MovieStore;
  constructor() {
    this.movie = new MovieStore();
  }
}

export const appStore = new AppStore();
