import {Dimensions, Platform} from 'react-native';

const remarkableIOSVersion = 13.0;
const CORE_RATIO = Number(667 / 375);
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_SCALE = CORE_RATIO / (SCREEN_HEIGHT / SCREEN_WIDTH);
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 667;
const width = (num: number): number => SCREEN_WIDTH * (num / 100);
const height = (num: number): number => SCREEN_HEIGHT * (num / 100);
const scale = (size: number): number =>
  (SCREEN_WIDTH / guidelineBaseWidth) * size;
const verticalScale = (size: number): number =>
  (SCREEN_HEIGHT / guidelineBaseHeight) * size;
const heightScale = (num: number): number =>
  SCREEN_HEIGHT * ((num * SCREEN_SCALE) / 100);
const widthScale = (num: number): number =>
  SCREEN_WIDTH * ((num * SCREEN_SCALE) / 100);
const IsIOS = Platform.OS === 'ios';
const enabledFormSheet =
  IsIOS && parseFloat(Platform.Version as string) >= remarkableIOSVersion;

const RealRatio = Number(
  Dimensions.get('screen').height / Dimensions.get('screen').width,
);

const arrayToObject = (array: any[]) => {
  return array.reduce(
    (obj: {[x: string]: any}, item: {id: string | number; value: any}) => {
      obj[item.id] = item;
      return obj;
    },
    {},
  );
};

const timeConvert = (num: number) => {
  var hours = Math.floor(num / 60);
  var minutes = num % 60;
  return `${hours}h` + ' ' + `${minutes}min`;
};

export {
  enabledFormSheet,
  RealRatio,
  IsIOS,
  scale,
  width,
  height,
  CORE_RATIO,
  heightScale,
  widthScale,
  verticalScale,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  arrayToObject,
  timeConvert,
};
