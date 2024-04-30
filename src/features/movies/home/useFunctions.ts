import {movieSDK} from 'moviesdk';
import {useCallback, useEffect} from 'react';

export const useMovieFunctions = () => {
  const init = useCallback(async () => {
    await movieSDK.fetchMovies();
  }, []);

  useEffect(() => {
    init();
  }, [init]);
  return {
    isLoading: movieSDK.movieStore.loading,
    movieList: movieSDK.movieStore.movieList,
    movieListSearch: movieSDK.movieStore.movieListSearch,
    onRefresh: init,
  };
};
