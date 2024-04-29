import React from 'react';
import {StyleSheet} from 'react-native';
import {color} from 'core/theme';
import {BaseText, BaseTextProps} from './base-text';

const Text26 = (props: BaseTextProps): JSX.Element => {
  const cusProps = {...props};
  cusProps.style = StyleSheet.flatten([styles.text, cusProps.style]);
  return <BaseText {...cusProps}>{props.children}</BaseText>;
};

export default Text26;

const styles = StyleSheet.create({
  text: {
    fontSize: 26,
    lineHeight: 38,
    color: color.text,
  },
});
