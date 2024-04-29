import React, {useMemo} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import Fuse from 'fuse.js';
import {find} from 'lodash';
import {width} from 'core/utils';
import {color} from 'core/theme';
import {appStore} from 'stores';

const options = {
  includeScore: true,
  // Search in `title` and in `genre_ids` array
  keys: ['title', 'genre_ids'],
};
const SearchBar = () => {
  const {movieList, genreList} = appStore.movie;
  const listHandled = useMemo(() => {
    const arrTemp = [];
    for (let index = 0; index < movieList.length; index++) {
      const element = movieList[index];
      const genreIds = element?.genre_ids ?? [];
      const arrGenre = [];
      for (let i = 0; i < genreIds.length; i++) {
        const genre = genreIds[i];
        const genreFound = find(genreList, o => o.id === genre);
        arrGenre.push(genreFound?.name);
      }
      arrTemp.push({...element, genre_ids: arrGenre});
    }
    return arrTemp;
  }, [genreList, movieList]);
  const fuse = new Fuse(listHandled, options);
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={text => {
          setTimeout(() => {
            const result = fuse.search(text);
            appStore.movie.setMovieListSearch(result);
          }, 1000);
        }}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: width(100),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.palette.white,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    width: width(100) - 32,
  },
});
