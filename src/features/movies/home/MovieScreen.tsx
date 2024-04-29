import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {observer} from 'mobx-react';
import {MovieType} from 'core/types';
import {MovieItem} from '../components';
import {useMovieFunctions} from './useFunctions';
import {height} from 'core/utils';
import {SearchBar} from 'components';

const MovieScreen = () => {
  const {isLoading, movieList, movieListSearch} = useMovieFunctions();
  const renderItem = ({item}: {item: MovieType}) => {
    return <MovieItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        renderItem={renderItem}
        refreshing={isLoading}
        keyExtractor={(i, idx) => `${i.id}${idx}`}
        ListFooterComponent={<View style={styles.footerList} />}
        data={movieListSearch.length > 0 ? movieListSearch : movieList}
      />
    </View>
  );
};

export default observer(MovieScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerList: {
    width: '100%',
    height: height(8),
  },
});
