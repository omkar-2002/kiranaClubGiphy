import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';

export const styles = StyleSheet.create({
  container: {flexDirection: 'row', width: '100%', marginHorizontal: 5},
  inputView: {
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    backgroundColor: Colors.white.default,
    borderRadius: 10,
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 10,
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
    flexBasis: '80%',
    marginLeft: 10,
  },
  textInput: {width: '80%', color: Colors.black.default},
  back: {
    padding: 5,
    flexBasis: '12%',
    backgroundColor: Colors.white.default,
    borderRadius: 10,
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 10,
  },
});

export default styles;
