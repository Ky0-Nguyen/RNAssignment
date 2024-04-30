import React from 'react';
import {StyleSheet, View} from 'react-native';

import {color} from 'core/theme';
import {Text14} from 'components';
import {find, toString, isObject} from 'lodash';

type Props = {
  genreList: any[];
  genres: any[];
};

const MovieTag = (props: Props) => {
  const {genres, genreList} = props;
  return (
    <View style={styles.tag}>
      {genres.map((i: any, idx: number) => {
        let genre = find(genreList, a => a.id === i);
        if (isObject(i)) {
          genre = i;
        }
        return (
          <View key={toString(`${genre?.id}${idx}`)} style={styles.genre}>
            <Text14 regular style={styles.textTag}>
              {genre?.name}
            </Text14>
          </View>
        );
      })}
    </View>
  );
};

export default MovieTag;

const styles = StyleSheet.create({
  textTag: {
    color: color.text,
  },
  tag: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingVertical: 16,
  },
  genre: {
    marginRight: 8,
    marginTop: 8,
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 24,
    backgroundColor: color.palette.lightGreen,
  },
});
