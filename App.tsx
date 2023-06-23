import React from 'react';
import {Text} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <Text>Hey there</Text>
    </SafeAreaProvider>
  );
};

export default App;
