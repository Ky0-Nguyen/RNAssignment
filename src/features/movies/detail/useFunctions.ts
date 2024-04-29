import {MovieType} from 'core/types';
import {useEffect, useState} from 'react';
import {fetchMovieDetail} from 'services/api';

export const useMovieDetailFunctions = (props: {
  route: {params: {movie: MovieType}};
}) => {
  const movie = props.route.params.movie;
  const [movieDetail, setMovieDetail] = useState(movie);
  useEffect(() => {
    const init = async () => {
      const res = await fetchMovieDetail(movie?.id ?? '');
      setMovieDetail(res);
      console.log('res', res);
    };
    init();
  }, [movie?.id]);
  return {movieDetail};
};
