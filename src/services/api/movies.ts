import {get, toString} from 'lodash';
import {BaseAPI} from './base-api';
import {API_ENDPOINT} from './endpoint';

export const fetchMovieList = async () => {
  const res = await BaseAPI.get(API_ENDPOINT.MOVIE_LIST);
  return get(res, 'data');
};

export const fetchMovieDetail = async (movieId: string | number) => {
  const res = await BaseAPI.get(
    API_ENDPOINT.MOVIE_DETAIL.replace('{movie_id}', toString(movieId)),
  );
  return get(res, 'data');
};

export const fetchGenreList = async () => {
  const res = await BaseAPI.get(API_ENDPOINT.GENRE_LIST);
  return get(res, 'data');
};
