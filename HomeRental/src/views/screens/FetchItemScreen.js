import React, {useEffect, useState, useContext, useRef} from 'react';
import {
  View,
  Button,
  Alert,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../Context/AuthContext';
import COLORS from '../../consts/colors';

const FetchItemScreen = ({navigation, route}) => {
  const {logout} = useContext(AuthContext);
  const refRBSheet = useRef();
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [search, setSearch] = useState('');
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [bottomSheetData, setBottomSheetData] = useState({});

  const getList = async () => {
    let groceryList = await AsyncStorage.getItem('grocery');
    setFilteredDataSource(JSON.parse(groceryList));
  };

  useEffect(() => {
    navigation.addListener('focus', async () => {
      getList();
    });
  }, []);

  const showAlertView = async () => {
    const result = await AsyncStorage.getItem('grocery');
    let grocery = [];
    if (grocery != null) grocery = JSON.parse(result);
    let filteredData = grocery.filter(e => e.id !== item.id);
    await AsyncStorage.setItem('grocery', JSON.stringify(filteredData));
    navigation.navigate('AddItem');
    // Alert("Item Deleted Successfully")
  };
  const deleteSelectedElement = async item => {
    await Alert.alert(
      'Are You Sure Want To Delete Item = ' + item.itemval.toUpperCase(),
      'Select Below Options',
      [
        {text: 'Cancel', onPress: () => {}, style: 'cancel'},
        {
          text: 'OK',
          onPress: () => {
            () => showAlertView();
            forceUpdate();
            navigation.navigate('AddItem');
          },
        },
      ],
    );
  };

  const searchFilterFunction = text => {
    setMasterDataSource(filteredDataSource);
    if (text) {
      const newData = filteredDataSource.filter(function (item) {
        // Applying filter for the inserted text in search bar
        const itemData = item.itemval
          ? item.itemval.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };
  const ItemRender = ({item}) => {
    return (
      <View style={styles.listItem}>
        <View>
          <Text style={styles.itemText}>Item Name - {item.itemval}</Text>
        </View>
        <View>
          <Text style={styles.itemText}>Item Price - {item.priceval}</Text>
        </View>
        <View>
          <Text style={styles.itemText}>
            Item Quantity - {item.quantityval}
          </Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.buttonStyle}>
            <Button
              onPress={() => navigation.navigate('UpdateItem', item)}
              title="Update">
              {' '}
            </Button>
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Delete"
              onPress={() => deleteSelectedElement(item)}></Button>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => logout()}>
        <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          marginBottom: 20,
          justifyContent: 'space-around',
        }}>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('AddExpense')}>
          <Text style={styles.text}>Add Expenses</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('AddItem')}>
          <Text style={styles.text}>Add Item</Text>
        </Pressable>
      </View>

      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        onChangeText={text => searchFilterFunction(text)}
        status="info"
        placeholder="Search"
        style={styles.filtersearch}
        textStyle={{color: '#000'}}
      />

      {filteredDataSource ? (
        <SafeAreaView>
          <FlatList
            style={{marginVertical: 20}}
            data={filteredDataSource}
            horizontal={true}
            contentContainerStyle={{
              flexGrow: 1,
            }}
            scrollEnabled={true}
            renderItem={({item}) => <ItemRender item={item} />}
            keyExtractor={item => item.id}
          />
        </SafeAreaView>
      ) : (
        <Text style={{color: 'red', marginTop: 30, marginHorizontal: 20}}>
          No data available
        </Text>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  itemText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#fff',
    textTransform: 'capitalize',
  },
  container: {
    flex: 1,
    width: '100%',
    padding: 16,
    paddingTop: 20,
  },
  listItem: {
    backgroundColor: COLORS.bgcolor,
    borderWidth: 1,
    borderColor: '#333',
    padding: 25,
    marginRight: 10,
    borderRadius: 10,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonStyle: {
    borderRadius: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginRight: 20,
    backgroundColor: COLORS.bgcolor,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginTop: 20,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  filtersearch: {
    borderRadius: 10,
    padding: 10,
    borderColor: '#D3D3D3',
    backgroundColor: '#000',
  },
});

export default FetchItemScreen;
