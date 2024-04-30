import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';

import {height} from 'core/utils';
import {observer} from 'mobx-react';
import {MovieType} from 'core/types';
import {SearchBar} from 'components';
import {MovieItem} from '../components';
import {useMovieFunctions} from './useFunctions';

const MovieScreen = () => {
  const {isLoading, movieList, movieListSearch, onRefresh} =
    useMovieFunctions();
  const renderItem = ({item}: {item: MovieType}) => {
    return <MovieItem item={item} />;
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        onRefresh={onRefresh}
        refreshing={isLoading}
        renderItem={renderItem}
        onEndReachedThreshold={16}
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
