import {View, TouchableOpacity} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import styles from './styles';
import Colors from '../../constants/Colors';

const GiphyCard = ({uri, onPressWhatsapp, onPressDownload}) => {
  return (
    <View style={styles.giphyCard}>
      <FastImage style={styles.gif} source={{uri}} />
      <View style={styles.iconView}>
        <TouchableOpacity onPress={onPressDownload} activeOpacity={0.5}>
          <Feather size={22} name="download" color={Colors.black.default} />
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressWhatsapp} activeOpacity={0.7}>
          <Fontisto size={22} name="whatsapp" color={Colors.black.default} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default GiphyCard;
