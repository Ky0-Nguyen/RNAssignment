import {MovieType} from 'core/types';
import {useEffect, useState} from 'react';
import {fetchMovieDetail, fetchMovieReviews} from 'services/api';

export const useMovieDetailFunctions = (props: {
  route: {params: {movie: MovieType}};
}) => {
  const movie = props.route.params.movie;
  const [movieDetail, setMovieDetail] = useState(movie);
  const [movieReviews, setMovieReview] = useState([]);
  useEffect(() => {
    const init = async () => {
      Promise.all([
        fetchMovieDetail(movie?.id ?? ''),
        fetchMovieReviews(movie?.id ?? ''),
      ]).then((results): any => {
        setMovieDetail(results[0]);
        setMovieReview(results[1]?.results);
      });
    };
    init();
  }, [movie?.id]);
  return {movieDetail, movieReviews};
};
