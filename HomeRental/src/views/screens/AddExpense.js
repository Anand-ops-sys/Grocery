import React, {Component} from 'react';

import {
  StyleSheet,
  FlatList,
  Text,
  View,
  Alert,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import COLORS from '../../consts/colors';

export default class AddExpense extends Component {
  constructor(props) {
    super(props);
    (this.array = []),
      (this.state = {
        arrayHolder: [],
        textInput_Holder: 0,
        totalSum: 0,
      });
  }

  componentDidMount() {
    this.setState({arrayHolder: [...this.array]});
  }

  joinData = () => {
    this.array.push({
      title: this.state.textInput_Holder + ' Rs. Expenses Added',
    });

    this.setState({
      totalSum:
        parseInt(this.state.totalSum) + parseInt(this.state.textInput_Holder),
    });
    this.setState({arrayHolder: [...this.array]});
  };
  showAlert = item => {
    Alert.alert('Your Total Expenses ' + this.state.totalSum, 'Rs.', [
      {text: 'Cancel', onPress: () => {}, style: 'cancel'},
      {
        text: 'OK',
        onPress: () => {},
      },
    ]);
  };
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#607D8B',
        }}
      />
    );
  };

  GetItem(item) {
    Alert.alert(item);
  }

  render() {
    return (
      <View style={styles.MainContainer}>
        <TextInput
          onChangeText={data => this.setState({textInput_Holder: data})}
          style={styles.textInputStyle}
          keyboardType="numeric"
          underlineColorAndroid="transparent"
        />

        <TouchableOpacity
          onPress={this.joinData}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.buttonText}> Add My Expenses </Text>
        </TouchableOpacity>

        <FlatList
          data={this.state.arrayHolder}
          width="100%"
          extraData={this.state.arrayHolder}
          keyExtractor={index => index.toString()}
          //   ItemSeparatorComponent={this.FlatListItemSeparator}

          renderItem={({item}) => (
            <Text
              style={styles.item}
              onPress={this.GetItem.bind(this, item.title)}>
              {' '}
              {item.title}{' '}
            </Text>
          )}
        />
        <TouchableOpacity
          onPress={this.showAlert}
          activeOpacity={0.7}
          style={styles.button}>
          <Text style={styles.buttonText}> Calculate My Total Expenses </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    margin: 20,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    color: COLORS.bgcolor,
    borderWidth: 2,
    color: COLORS.bgcolor,
    marginVertical: 20,
    marginBottom: 2,
    borderColor: COLORS.bgcolor,
    borderRadius: 7,
  },

  textInputStyle: {
    textAlign: 'center',
    height: 40,
    color: COLORS.bgcolor,
    width: '90%',
    borderWidth: 1,
    placeholder: COLORS.bgcolor,
    borderColor: COLORS.bgcolor,
    borderRadius: 7,
    marginTop: '15%',
  },

  button: {
    width: '90%',
    height: 40,
    padding: 10,
    backgroundColor: COLORS.bgcolor,
    borderRadius: 8,
    marginTop: 10,
  },

  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
