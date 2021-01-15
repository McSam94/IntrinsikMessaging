import React, { Suspense } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Text } from 'react-native';
import Toast from 'react-native-toast-message';
import { Providers } from 'Stores';
import Navigation from 'Navigation';

const App = () => {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <SafeAreaProvider>
        <Providers>
          <Navigation />
          <Toast ref={(ref) => Toast.setRef(ref)} />
        </Providers>
      </SafeAreaProvider>
    </Suspense>
  );
};

export default App;
