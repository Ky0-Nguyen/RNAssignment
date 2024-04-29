import React, {useCallback} from 'react';
import {Image, StyleSheet, View, TouchableOpacity} from 'react-native';

import {appStore} from 'stores';
import {color} from 'core/theme';
import {MovieType} from 'core/types';
import {width, height} from 'core/utils';
import {find, isUndefined} from 'lodash';
import {ROUTER_KEY} from 'core/constants';
import {navigationServices} from 'services';
import {Text12, Text14, Text24} from 'components';

type Props = {
  item: MovieType;
};

const MovieItem = (props: Props) => {
  const {item} = props;
  const {genreList} = appStore.movie;
  const gotoDetail = useCallback(() => {
    navigationServices.pushToScreen(ROUTER_KEY.MOVIE_DETAIL, {
      movie: isUndefined(item?.id) ? item?.item : item,
    });
  }, [item]);

  const genreIds = item?.genre_ids || item?.item?.genre_ids;
  const title = item?.title || item?.item?.title;
  const voteAverage = item?.vote_average || item?.item?.vote_average;
  const voteCount = item?.vote_count || item?.item?.vote_count;
  const posterPath = item?.poster_path || item?.item?.poster_path;
  const releaseDate = item?.release_date || item?.item?.release_date;
  return (
    <TouchableOpacity onPress={gotoDetail}>
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/w500${posterPath}`,
          }}
          style={styles.image}
        />
        <View style={styles.rightContainer}>
          <Text24 bold numberOfLines={3}>
            {title}
          </Text24>
          <Text12 style={styles.textRate}>
            {`Rate: ${voteAverage}/10   Count: ${voteCount}`}
          </Text12>

          <View style={styles.tag}>
            {genreIds.map((i: any) => {
              let genre = find(genreList, a => a.id === i);
              if (!isUndefined(item?.item)) {
                genre = i;
              }

              return (
                <View key={i} style={styles.genre}>
                  <Text12 regular style={styles.textTag}>
                    {!isUndefined(item?.item) ? genre : genre?.name}
                  </Text12>
                </View>
              );
            })}
          </View>
          <Text14 style={styles.textDate}>{`Date: ${releaseDate}`}</Text14>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default MovieItem;

const styles = StyleSheet.create({
  itemContainer: {
    padding: 16,
    marginTop: 16,
    width: width(100),
    height: height(25),
    flexDirection: 'row',
  },
  image: {
    width: width(30),
    borderRadius: 16,
    height: height(25),
  },
  rightContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  textRate: {
    marginTop: 8,
    color: color.subText,
  },
  textDate: {
    marginTop: 8,
    color: color.text,
  },
  textTag: {
    color: color.text,
  },
  tag: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  genre: {
    marginRight: 8,
    marginTop: 8,
    padding: 4,
    borderRadius: 8,
    backgroundColor: color.palette.lightGreen,
  },
});
