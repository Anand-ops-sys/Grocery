import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {AuthContext} from '../../Context/AuthContext';
import COLORS from '../../consts/colors';

const SignIn = navigation => {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const {register} = useContext(AuthContext);

  return (
    <View style={styles.logincontainer}>
      <Text style={styles.logintext}>Sign Up Screen</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter email"
          value={email}
          onChangeText={e => setEmail(e)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Enter password"
          value={pass}
          onChangeText={e => setPass(e)}
        />
      </View>
      <View style={{width: '100%', marginVertical: 10, alignItems: 'center'}}>
        <TouchableOpacity
          style={{
            width: '85%',
            borderRadius: 10,
            padding: 10,
            height: 40,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => register(email, pass)}>
          <Text>SignUp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  logincontainer: {
    flex: 1,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logintext: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 30,
  },
  textinputcontainer: {
    width: '100%',
    marginVertical: 10,
    alignItems: 'center',
  },

  inputlayout: {
    width: '85%',
    padding: 10,
    height: 40,
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputView: {
    backgroundColor: COLORS.bgcolor,
    borderRadius: 10,
    width: '85%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
});
