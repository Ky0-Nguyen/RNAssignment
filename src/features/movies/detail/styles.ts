import {color} from 'core/theme';
import {width} from 'core/utils';
import {StyleSheet, Platform} from 'react-native';

export const HEADER_MAX_HEIGHT = 350;
export const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 70 : 73;
export const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;
export default StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: color.primary,
    overflow: 'hidden',
    height: HEADER_MAX_HEIGHT,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    width: '100%',
  },
  title: {
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    // iOS uses content inset, which acts like padding.
    paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT + 50 : 50,
    paddingHorizontal: 16,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBack: {
    zIndex: 2,
    elevation: 2,
    position: 'absolute',
    left: 4,
  },
  textTitle: {
    color: color.text,
  },
  textRate: {
    left: 8,
    color: color.subText,
  },
  containerRate: {
    marginTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textTag: {
    color: color.text,
  },
  containerInfo: {
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  childInfo: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 200,
    marginTop: 16,
    marginBottom: 32,
    width: width(100) - 32,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: color.line,
  },
  companyInfo: {
    marginTop: 16,
  },
});
