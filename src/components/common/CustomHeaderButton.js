import React from 'react';
import {HeaderButton} from 'react-navigation-header-buttons';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeaderButton = props => {
  return <HeaderButton IconComponent={Ionicons} iconSize={26} {...props} />;
};

export default CustomHeaderButton;
