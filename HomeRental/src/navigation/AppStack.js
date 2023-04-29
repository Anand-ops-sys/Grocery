import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import FetchItemScreen from '../views/screens/FetchItemScreen';
import AddItem from '../views/screens/AddItem';
import AddExpense from '../views/screens/AddExpense';
import UpdateItem from '../views/screens/UpdateItem';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="FetchItemScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="FetchItemScreen" component={FetchItemScreen} />
      <Stack.Screen name="AddExpense" component={AddExpense} />
      <Stack.Screen name="AddItem" component={AddItem} />
      <Stack.Screen name="UpdateItem" component={UpdateItem} />
    </Stack.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({});
