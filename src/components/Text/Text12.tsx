import React from 'react';
import {StyleSheet} from 'react-native';

import {color} from 'core/theme';
import {BaseText, BaseTextProps} from './base-text';

const Text12 = (props: BaseTextProps): JSX.Element => {
  const cusProps = {...props};
  cusProps.style = StyleSheet.flatten([styles.text, cusProps.style]);
  return (
    <BaseText regular {...cusProps}>
      {props.children}
    </BaseText>
  );
};

export default Text12;

const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    lineHeight: 18,
    fontWeight: '400',
    color: color.primary,
  },
});
