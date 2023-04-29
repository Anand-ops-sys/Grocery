import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../views/screens/Login';
import SignIn from '../views/screens/SIgnIn';

const Stack = createStackNavigator();
const AuthStack = (navigation) => {
    return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignIn" component={SignIn} />
       </Stack.Navigator>
    )
}

export default AuthStack
const styles = StyleSheet.create({})