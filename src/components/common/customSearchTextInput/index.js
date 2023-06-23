import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../constants/Colors';
import styles from './styles';

const CustomSearchTextInput = ({
  value,
  handleTextChange,
  searchGifs,
  ...inputProps
}) => {
  return (
    <View style={styles.inputView}>
      <TextInput
        value={value}
        onChangeText={handleTextChange}
        style={styles.textInput}
        placeholder="Search Gifs..."
        placeholderTextColor={Colors.grey.light1}
        {...inputProps}
      />
      <TouchableOpacity activeOpacity={0.4} onPress={searchGifs}>
        <Feather size={24} name="search" color={Colors.black.default} />
      </TouchableOpacity>
    </View>
  );
};

export default CustomSearchTextInput;
