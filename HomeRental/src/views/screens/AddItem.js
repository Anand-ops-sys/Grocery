import {StatusBar} from 'react-native';
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';
import COLORS from '../../consts/colors';
export default function AddItem({navigation, route}) {
  const [item, setItem] = useState('no name');
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(0);
  const Info = {
    id: uuid.v4(),
    itemval: item,
    quantityval: quantity,
    priceval: price,
  };
  const handleOnPress = async () => {
    let newList = [];
    let list = await AsyncStorage.getItem('grocery');
    if (list) {
      newList = [...JSON.parse(list), Info];
    } else {
      newList.push(Info);
    }
    AsyncStorage.setItem('grocery', JSON.stringify(newList));
    navigation.navigate('FetchItemScreen', Info);
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />
      <Text style={styles.additem}>Add Item</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Add Grocery Item Name"
          placeholderTextColor="#2d2d2d"
          onChangeText={item => setItem(item)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Add Grocery Quantity"
          placeholderTextColor="#2d2d2d"
          keyboardType="numeric"
          onChangeText={quantity => setQuantity(quantity)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder="Add Grocery Price"
          placeholderTextColor="#2d2d2d"
          keyboardType="numeric"
          onChangeText={price => setPrice(price)}
        />
      </View>
      <Pressable style={styles.loginBtn} onPress={() => handleOnPress()}>
        <View>
          <Text style={styles.loginText}>Save</Text>
        </View>
      </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    marginBottom: 40,
  },
  inputView: {
    backgroundColor: '#D3D3D3',
    borderRadius: 10,
    width: '80%',
    height: 45,
    marginBottom: 20,
    alignItems: 'center',
  },
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    color: COLORS.bgcolor,
    marginLeft: 20,
  },
  additem: {
    fontWeight: 'bold',
    marginBottom: '10%',
    color: COLORS.bgcolor,
    fontSize: 20,
  },
  forgot_button: {
    height: 30,
    marginBottom: 30,
  },
  loginBtn: {
    width: '80%',
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: COLORS.bgcolor,
  },
});
