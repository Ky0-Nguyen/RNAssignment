import React from 'react';
import {Text, TextStyle} from 'react-native';

import {color} from 'core/theme';

export interface BaseTextProps {
  bold?: boolean;
  semiBold?: boolean;
  regular?: boolean;
  medium?: boolean;
  extraBold?: boolean;
  children: any;
  numberOfLines?: number;
  style?: TextStyle;
  suppressHighlighting?: boolean;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  onPress?: () => void;
  adjustsFontSizeToFit?: boolean;
}
export const BaseText = ({
  children,
  bold,
  semiBold,
  regular,
  medium,
  extraBold,
  numberOfLines,
  style,
  suppressHighlighting,
  ellipsizeMode,
  onPress,
  adjustsFontSizeToFit = false,
}: BaseTextProps): JSX.Element => {
  const customStyle: TextStyle = {color: color.text};
  if (regular) {
    // customStyle.fontFamily = FONTS.Regular;
    customStyle.fontWeight = '400';
  } else if (medium) {
    // customStyle.fontFamily = FONTS.Medium;
    customStyle.fontWeight = '500';
  } else if (bold) {
    // customStyle.fontFamily = FONTS.Bold;
    customStyle.fontWeight = '700';
  } else if (semiBold) {
    // customStyle.fontFamily = FONTS.SemiBold;
    customStyle.fontWeight = '600';
  } else if (extraBold) {
    // customStyle.fontFamily = FONTS.ExtraBold;
    customStyle.fontWeight = '900';
  }
  return (
    <Text
      adjustsFontSizeToFit={adjustsFontSizeToFit}
      onPress={onPress}
      style={[customStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}
      suppressHighlighting={suppressHighlighting}>
      {children}
    </Text>
  );
};
