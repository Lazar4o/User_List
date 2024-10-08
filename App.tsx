import React, { useCallback, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppStack from './src/navigation/RootStack';
import { StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { loadAppColors } from './src/theme/designSystem';
import { Provider } from 'react-redux';
import { store } from './src/store/store';

const App = (): React.JSX.Element => {
  const onLaunch = useCallback(async () => {
    loadAppColors();
  }, []);

  useEffect(() => {
    onLaunch();
  }, [onLaunch]);

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        {/* @TODO: Extract the colors */}
        <NavigationContainer
          theme={{
            dark: false,
            colors: {
              primary: 'dark',
              background: 'white',
              card: 'white',
              text: 'pink',
              border: 'brown',
              notification: 'blue',
            },
          }}>
          <StatusBar backgroundColor={'white'} />
          <AppStack />
        </NavigationContainer>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
