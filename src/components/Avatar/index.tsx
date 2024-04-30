import React from 'react';
import {color} from 'core/theme';
import {StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  size: number;
  image: string;
};

const DEFAULT_SIZE = 40;

const Avatar = (props: Props) => {
  const {size, image} = props;
  return (
    <View
      style={StyleSheet.flatten([
        styles.image,
        {width: size, height: size, borderRadius: size / 2},
      ])}>
      {image ? (
        <Image
          source={{uri: image}}
          style={StyleSheet.flatten([
            {width: size - 2, height: size - 2, borderRadius: (size - 2) / 2},
          ])}
          resizeMode="stretch"
        />
      ) : (
        <Icon
          name="user"
          size={size - 2 || DEFAULT_SIZE - 2}
          color={color.palette.dark}
        />
      )}
    </View>
  );
};

export default Avatar;

const styles = StyleSheet.create({
  image: {
    borderWidth: 1,
    width: DEFAULT_SIZE,
    height: DEFAULT_SIZE,
    borderRadius: DEFAULT_SIZE / 2,
  },
});
