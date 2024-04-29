import React, {useEffect} from 'react';

import {configure} from 'mobx';
import {localService} from './services';
import {RootNavigator} from './navigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

configure({
  reactionRequiresObservable: false,
});

const App = (): JSX.Element => {
  useEffect(() => {
    localService.load();
  }, []);

  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};
export default App;
