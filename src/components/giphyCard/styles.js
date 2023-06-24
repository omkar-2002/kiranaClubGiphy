import {StyleSheet, Dimensions} from 'react-native';
const width = Dimensions.get('window').width;
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
  giphyCard: {
    padding: 10,
    backgroundColor: '#2a2a2a',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
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
