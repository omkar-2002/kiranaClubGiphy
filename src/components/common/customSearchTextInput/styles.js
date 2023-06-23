import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  inputView: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.white.default,
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    elevation: 5,
  },
  textInput: {width: '80%', color: Colors.black.default},
});

export default styles;
