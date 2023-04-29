import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import FetchItemScreen from './src/views/screens/FetchItemScreen';
import AddItem from './src/views/screens/AddItem';
import { AuthProvider } from './src/Context/AuthContext';
import AppNav from './src/navigation/AppNav';
const Stack = createStackNavigator();

const App = () => {
  return (
    <AuthProvider navigation >
      <AppNav />
    </AuthProvider>
   
  );
};

export default App;
