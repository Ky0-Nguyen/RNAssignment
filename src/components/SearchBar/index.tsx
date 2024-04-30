import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

import {width} from 'rnsdk-utils';
import {color} from 'core/theme';
import {movieSDK} from 'moviesdk';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search"
        onChangeText={text => {
          movieSDK.searchMovies(text);
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
