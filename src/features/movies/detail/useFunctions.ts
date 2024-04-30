import {useCallback, useEffect} from 'react';
import {toString} from 'lodash';
import {movieSDK} from 'moviesdk';

export const useMovieDetailFunctions = (movieId: string) => {
  const init = useCallback(async () => {
    if (movieId && toString(movieId).length > 0) {
      await movieSDK.fetchMovieDetail(movieId);
    }
  }, [movieId]);
  useEffect(() => {
    init();
  }, [init]);
  return {
    onRefresh: init,
    isLoading: movieSDK.movieStore.loading,
    movieDetail: movieSDK.movieStore.movieDetail,
    movieReviews: movieSDK.movieStore.movieReviews,
  };
};
