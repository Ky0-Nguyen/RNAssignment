import React, {useCallback, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {appStore} from 'stores';
import {color} from 'core/theme';
import {observer} from 'mobx-react';
import {timeConvert} from 'core/utils';
import {IMAGE_BASE_URL} from 'configs';
import {MovieReview} from '../components';
import {MovieReviewType} from 'core/types';
import {navigationServices} from 'services';
import MovieTag from '../components/MovieTag';
import {useMovieDetailFunctions} from './useFunctions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Text12, Text14, Text16, Text26, Text32} from 'components';
import styles, {HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE} from './styles';

type Props = {
  navigation: any;
  route: any;
};

const MovieDetailScreen = (props: Props) => {
  const {movieDetail, movieReviews} = useMovieDetailFunctions(props);

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
  const {genreList} = appStore.movie;
  const renderScrollViewContent = useCallback(() => {
    const genres = movieDetail?.genres ?? [];
    const productionCompanies = movieDetail?.production_companies ?? [];
    return (
      <View style={styles.scrollViewContent}>
        <Text32 bold style={styles.textTitle}>
          {movieDetail?.title}
        </Text32>
        <View style={styles.containerRate}>
          <Ionicons name="star" size={20} color={color.palette.yellow} />
          <Text12 style={styles.textRate}>
            {`${movieDetail?.vote_average}/10   Count: ${movieDetail?.vote_count}`}
          </Text12>
        </View>
        <MovieTag genres={genres} genreList={genreList} />
        <View style={styles.containerInfo}>
          {movieDetail?.runtime ? (
            <View style={styles.childInfo}>
              <Text16 style={styles.textTag}>{'Length'}</Text16>
              <Text16 style={styles.textTag}>
                {timeConvert(movieDetail?.runtime)}
              </Text16>
            </View>
          ) : (
            <View />
          )}

          {movieDetail?.spoken_languages &&
          movieDetail?.spoken_languages.length > 0 ? (
            <View style={styles.childInfo}>
              <Text16 style={styles.textTag}>{'Language'}</Text16>
              <Text16 style={styles.textTag}>
                {movieDetail?.spoken_languages[0]?.name}
              </Text16>
            </View>
          ) : (
            <View />
          )}
        </View>

        <Text26 bold style={styles.textTitle}>
          {'Description'}
        </Text26>
        <Text14 regular style={styles.textTitle}>
          {movieDetail?.overview}
        </Text14>
        {movieDetail?.homepage ? (
          <Text14 regular style={styles.textTitle}>
            Home page: {movieDetail?.homepage}
          </Text14>
        ) : (
          <View />
        )}
        <Text26
          bold
          style={StyleSheet.flatten([styles.textTitle, {marginTop: 32}])}>
          {'Product companies'}
        </Text26>
        {productionCompanies && productionCompanies.length > 0 ? (
          productionCompanies.map((company, idx) => {
            return (
              <View style={styles.companyInfo} key={`${company?.id}${idx}`}>
                <Text14 regular style={styles.textTitle}>
                  Name: {company?.name}
                  {` (${company.origin_country})`}
                </Text14>
                {company?.logo_path ? (
                  <Image
                    resizeMode={'stretch'}
                    style={styles.logo}
                    source={{
                      uri: `${IMAGE_BASE_URL}${company?.logo_path}`,
                    }}
                  />
                ) : (
                  <View />
                )}
                <View style={styles.line} />
              </View>
            );
          })
        ) : (
          <View />
        )}
        {movieReviews.length > 0 ? (
          <>
            <Text26
              bold
              style={StyleSheet.flatten([styles.textTitle, {marginTop: 32}])}>
              {'Reviews'}
            </Text26>
            {movieReviews.map((review: MovieReviewType, idx) => {
              return <MovieReview key={`${review?.id}${idx}`} item={review} />;
            })}
          </>
        ) : (
          <View />
        )}
      </View>
    );
  }, [
    genreList,
    movieDetail?.genres,
    movieDetail?.homepage,
    movieDetail?.overview,
    movieDetail?.production_companies,
    movieDetail?.runtime,
    movieDetail?.spoken_languages,
    movieDetail?.title,
    movieDetail?.vote_average,
    movieDetail?.vote_count,
    movieReviews,
  ]);
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
