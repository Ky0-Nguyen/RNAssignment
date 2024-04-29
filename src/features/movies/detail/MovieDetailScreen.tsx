import React, {useState} from 'react';
import {
  Animated,
  Platform,
  RefreshControl,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, {HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE} from './styles';
import {color} from 'core/theme';
import {navigationServices} from 'services';
import {useMovieDetailFunctions} from './useFunctions';

type Props = {
  navigation: any;
  route: any;
};

const MovieDetailScreen = (props: Props) => {
  const {movieDetail} = useMovieDetailFunctions(props);

  const [isLoading, setLoading] = useState(false);
  const [scrollYState] = useState(
    new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
  );

  const scrollY = Animated.add(
    scrollYState,
    Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
  );
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, -HEADER_SCROLL_DISTANCE],
    extrapolate: 'clamp',
  });

  const imageOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0],
    extrapolate: 'clamp',
  });
  const imageTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [0, 100],
    extrapolate: 'clamp',
  });

  const titleScale = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 1, 0.8],
    extrapolate: 'clamp',
  });
  const titleTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [4, 6, 8],
    extrapolate: 'clamp',
  });
  const backTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [8, 6, -30],
    extrapolate: 'clamp',
  });

  const renderScrollViewContent = () => {
    const data = Array.from({length: 30});
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) => (
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        ))}
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.251)"
      />
      <Animated.ScrollView
        style={styles.container}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollYState}}}],
          {useNativeDriver: true},
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              setLoading(true);
              setTimeout(() => setLoading(false), 1000);
            }}
            // Android offset for RefreshControl
            progressViewOffset={HEADER_MAX_HEIGHT}
          />
        }
        // iOS offset for RefreshControl
        contentInset={{
          top: HEADER_MAX_HEIGHT,
        }}
        contentOffset={{
          x: 0,
          y: -HEADER_MAX_HEIGHT,
        }}>
        {renderScrollViewContent()}
      </Animated.ScrollView>
      {/* header has image */}
      <Animated.View
        pointerEvents="none"
        style={[styles.header, {transform: [{translateY: headerTranslate}]}]}>
        <Animated.Image
          style={[
            styles.backgroundImage,
            {
              opacity: imageOpacity,
              transform: [{translateY: imageTranslate}],
            },
          ]}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movieDetail?.backdrop_path}`,
          }}
        />
      </Animated.View>
      {/* header no image */}
      <Animated.View
        style={[
          styles.bar,
          {
            transform: [{scale: titleScale}, {translateY: titleTranslate}],
          },
        ]}>
        <Animated.View
          style={[
            styles.buttonBack,
            {transform: [{translateX: backTranslate}]},
          ]}>
          <TouchableOpacity onPress={navigationServices.back}>
            <Ionicons name="arrow-back" size={30} color={color.palette.white} />
          </TouchableOpacity>
        </Animated.View>
        <Text style={styles.title}>{movieDetail?.title}</Text>
      </Animated.View>
    </View>
  );
};

export default observer(MovieDetailScreen);
