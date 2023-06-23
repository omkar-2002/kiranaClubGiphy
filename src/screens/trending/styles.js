import {StyleSheet} from 'react-native';
import Colors from '../../constants/Colors';

export const styles = StyleSheet.create({
    container:{backgroundColor: Colors.white.default, flex: 1},
    header:{
        fontSize: 18,
        color: Colors.black.default,
        fontWeight: 'bold',
        marginHorizontal: 20,
      },
      flatlist:{flex: 1},
      flatListContent:{
        alignItems: 'center',
        padding: 20,
      }
});

export default styles;
