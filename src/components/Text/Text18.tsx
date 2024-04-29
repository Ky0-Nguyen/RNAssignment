import React from 'react';
import {StyleSheet} from 'react-native';
import {color} from 'core/theme';
import {BaseText, BaseTextProps} from './base-text';

const Text18 = (props: BaseTextProps): JSX.Element => {
  const cusProps = {...props};
  cusProps.style = StyleSheet.flatten([styles.text, cusProps.style]);
  return <BaseText {...cusProps}>{props.children}</BaseText>;
};

export default Text18;

const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    lineHeight: 24,
    color: color.primary,
  },
});
