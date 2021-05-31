import 'react-native-gesture-handler';
import React, {StrictMode} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {store} from './src/app/store';
import {Provider} from 'react-redux';
import NavigationStack from './src/app/NavigationStack';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaView style={styles.container}>
        <NavigationStack />
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F4F8D',
  },
});

export default App;
