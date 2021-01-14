import React, { Suspense } from 'react';
import { Text } from 'react-native';
import { Providers } from 'Stores';
import Navigation from 'Navigation';

const App = () => {
  return (
    <Suspense fallback={<Text>Loading...</Text>}>
      <Providers>
        <Navigation />
      </Providers>
    </Suspense>
  );
};

export default App;
