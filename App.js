import React, { Suspense, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Providers } from 'Stores';
import Navigation from 'Navigation';
import { TOAST_CONFIG } from 'Utils/constants';

const App = () => {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SafeAreaProvider>
        <Providers>
          <Navigation />
          <Toast config={TOAST_CONFIG} ref={(ref) => Toast.setRef(ref)} />
        </Providers>
      </SafeAreaProvider>
    </Suspense>
  );
};

export default App;
