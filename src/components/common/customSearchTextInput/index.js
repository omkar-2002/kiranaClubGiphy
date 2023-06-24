import {View, TextInput, TouchableOpacity} from 'react-native';
import React from 'react';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../../constants/Colors';
import styles from './styles';

const CustomSearchTextInput = React.forwardRef(
  (
    {
      value,
      handleTextChange,
      searchGifs,
      onPressBack,
      isDarkTheme,
      ...inputProps
    },
    ref,
  ) => {
    return (
      <View style={[styles.container]}>
        <TouchableOpacity
          onPress={onPressBack}
          activeOpacity={0.3}
          style={[
            styles.back,
            {
              backgroundColor: !isDarkTheme
                ? Colors.white.default
                : Colors.black.light,
            },
          ]}>
          <Feather
            size={24}
            name="chevron-left"
            color={isDarkTheme ? Colors.white.default : Colors.black.default}
          />
        </TouchableOpacity>
        <View
          style={[
            styles.inputView,
            {
              backgroundColor: !isDarkTheme
                ? Colors.white.default
                : Colors.black.light,
            },
          ]}>
          <TextInput
            ref={ref}
            value={value}
            onChangeText={handleTextChange}
            style={[
              styles.textInput,
              {
                color: isDarkTheme
                  ? Colors.white.default
                  : Colors.black.default,
              },
            ]}
            placeholder="Search Gifs..."
            placeholderTextColor={Colors.grey.light}
            returnKeyType="next"
            onSubmitEditing={searchGifs}
            {...inputProps}
          />
          <TouchableOpacity activeOpacity={0.4} onPress={searchGifs}>
            <Feather
              size={24}
              name="search"
              color={isDarkTheme ? Colors.white.default : Colors.black.default}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  },
);
export default CustomSearchTextInput;
