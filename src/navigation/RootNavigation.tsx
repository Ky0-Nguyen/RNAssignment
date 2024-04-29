import React, {useEffect, useRef} from 'react';

import {ROUTER_KEY} from 'core/constants';
import {navigationServices} from 'services';
import {createStackNavigator} from '@react-navigation/stack';
import {MovieDetailScreen, MovieScreen} from 'features/movies';

import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';

const Stack = createStackNavigator();
const STACK_OPTION = {
  headerShown: true,
};
type propsRootNavigator = {
  isLogin?: boolean;
};

const RootNavigator: React.FC<propsRootNavigator> = () => {
  const navigatorRef = useRef<NavigationContainerRef<any>>(null);
  useEffect(() => {
    navigationServices.setTopLevelNavigator(navigatorRef.current);
  }, []);

  return (
    <NavigationContainer ref={navigatorRef}>
      <Stack.Navigator
        initialRouteName={ROUTER_KEY.MOVIES}
        screenOptions={STACK_OPTION}>
        <Stack.Screen name={ROUTER_KEY.MOVIES} component={MovieScreen} />
        <Stack.Screen
          name={ROUTER_KEY.MOVIE_DETAIL}
          component={MovieDetailScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
