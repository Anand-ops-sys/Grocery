import React, { createContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Alert} from 'react-native';
export const AuthContext = createContext();

export const AuthProvider = ({ children ,navigation}) => {
    const [user, setUser] = useState(null);
    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: async (email, password) => {
                    try {
                        await auth().signInWithEmailAndPassword(email, password);
                    } catch (e) {
                        Alert.alert("The email address is badly formatted.");
                        console.log(e)
                    }
                },
                register: async (email, password) => {
                    try {
                        await auth().createUserWithEmailAndPassword(email, password);
                    } catch (e) {
                        Alert.alert("Already Registed");
                        navigation.navigate('LogIn')
                        console.log(e)
                    }
                },
                logout: async () => {
                    try {
                        await auth().signOut();
                    }catch(e){
                        Alert.alert("Something Went Wrong");
                        console.log(e)
                    }
        }
            }}>
            {children}
        </AuthContext.Provider>
    );
};
