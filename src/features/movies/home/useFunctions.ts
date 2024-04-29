import {get} from 'lodash';
import {useEffect, useState} from 'react';
import {fetchGenreList, fetchMovieList} from 'services/api';
import {appStore} from 'stores';

export const useMovieFunctions = () => {
  const [isLoading, setLoading] = useState(false);
  const {movieList, movieListSearch} = appStore.movie;

  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true);
        const res = await fetchMovieList();
        const responseGenre = await fetchGenreList();
        appStore.movie.setMovieList(get(res, 'results'));
        appStore.movie.setGenreList(get(responseGenre, 'genres'));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);
  return {
    isLoading,
    movieList,
    movieListSearch,
  };
};
