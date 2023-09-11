import React from 'react';
import NavigatorDrawer from './src/navigators/NavigatorsDrawer.js';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './redux/store.js'; // Asegúrate de importar correctamente el store
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <NavigationContainer>
    <Provider store={store}>
      <NavigatorDrawer />
    </Provider>
    </NavigationContainer>
  );
}
