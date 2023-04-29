import {StatusBar} from 'react-native';
import React, {useState, useEffect} from 'react';
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
import COLORS from '../../consts/colors';
export default function UpdateItem({navigation, route}) {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const olditem = route.params;
  const Info = {
    id: olditem.id,
    itemval: item,
    quantityval: quantity,
    priceval: price,
  };

  useEffect(() => {
    setItem(olditem.itemval);
    setQuantity(olditem.quantityval);
    setPrice(olditem.priceval);
  }, []);
  const removeByClass = (array, filterString) => {
    const memberToRemove = array.find(element => {
      return element.id === filterString;
    });
    array.splice(array.indexOf(memberToRemove), 1);
  };
  const handleOnPress = async () => {
    let newList = [];
    let list = await AsyncStorage.getItem('grocery');

    if (list) {
      newList = [...JSON.parse(list), Info];
    }
    removeByClass(newList, olditem.id);
    AsyncStorage.setItem('grocery', JSON.stringify(newList));

    navigation.navigate('FetchItemScreen');
  };
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={COLORS.tranparent} />
      <Text style={styles.addtext}>Add Item</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={item}
          placeholderTextColor="#2d2d2d"
          onChangeText={item => setItem(item)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={quantity}
          placeholderTextColor="#2d2d2d"
          keyboardType="numeric"
          onChangeText={quantity => setQuantity(quantity)}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          value={price}
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
  addtext: {
    fontWeight: 'bold',
    marginBottom: '10%',
    color: COLORS.bgcolor,
    fontSize: 20,
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
