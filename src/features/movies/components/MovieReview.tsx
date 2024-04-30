import React from 'react';
import {StyleSheet, View} from 'react-native';

import {toString} from 'lodash';
import {color} from 'core/theme';
import {width} from 'core/utils';
import {IMAGE_BASE_URL} from 'configs';
import {MovieReviewType} from 'core/types';
import {Avatar, Text12, Text14} from 'components';
import Ionicons from 'react-native-vector-icons/Ionicons';

type Props = {
  item: MovieReviewType;
};

const MovieReview = (props: Props) => {
  const {item} = props;
  const arrRating = Array.from(Array(item?.author_details?.rating ?? 0).keys());
  const renderRating = () => {
    return (
      <View style={styles.rowRating}>
        {arrRating.map(i => {
          return (
            <Ionicons
              key={toString(i)}
              name="star"
              size={20}
              color={color.palette.yellow}
            />
          );
        })}
      </View>
    );
  };
  return (
    <View style={styles.itemContainer}>
      <View style={styles.topView}>
        <Avatar
          size={60}
          image={
            item?.author_details?.avatar_path
              ? `${IMAGE_BASE_URL}${item?.author_details?.avatar_path}`
              : ''
          }
        />
        <View style={styles.topRightView}>
          <Text14 bold style={styles.textName}>{`${item?.author}`}</Text14>
          {renderRating()}
          <Text12
            regular
            style={styles.textName}>{`Date: ${item?.updated_at}`}</Text12>
        </View>
      </View>
      <Text14 bold style={styles.textName}>
        {'Comment'}
      </Text14>
      <Text14 regular style={styles.textName}>{`${item?.content}`}</Text14>
    </View>
  );
};

export default MovieReview;

const styles = StyleSheet.create({
  itemContainer: {
    marginTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    width: width(100) - 32,
    borderBottomColor: color.line,
  },
  topView: {
    marginBottom: 32,
    alignItems: 'center',
    flexDirection: 'row',
  },
  topRightView: {
    marginHorizontal: 16,
  },
  textName: {
    color: color.text,
  },
  rowRating: {
    flexDirection: 'row',
  },
});
