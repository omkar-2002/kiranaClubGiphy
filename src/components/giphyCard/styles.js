import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  giphyCard: {
    padding: 10,
    backgroundColor: Colors.white.default,
    elevation: 5,
    borderRadius: 7,
    margin: 10,
  },
  gif: {width: width * 0.3, height: width * 0.3},
  iconView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
});

export default styles;