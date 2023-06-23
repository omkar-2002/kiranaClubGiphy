import {Text, View, FlatList, ActivityIndicator, Button} from 'react-native';
import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';

import CustomHeaderButton from '../../components/common/CustomHeaderButton';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors';
import {getExtraTrendingGif, getTrendingGif} from '../../store/giphy/thunk';
import {
  trendingExtraGifLoadingSelector,
  trendingGifSelector,
} from '../../store/giphy/selector';
import GiphyCard from '../../components/giphyCard';
import styles from './styles';

const Trending = () => {
  const dispatch = useDispatch();
  const trendingGifs = useSelector(trendingGifSelector);
  const listEndLoading = useSelector(trendingExtraGifLoadingSelector);

  useEffect(() => {
    dispatch(getTrendingGif());
  }, []);

  const ListFooterComponent = () =>
    !listEndLoading ? (
      <Button title="Load more" onPress={loadExtraGifs} />
    ) : (
      <ActivityIndicator size={24} color={Colors.black.default} />
    );

  const loadExtraGifs = () => {
    dispatch(getExtraTrendingGif());
  };

  const renderGifs = ({item}) => {
    return <GiphyCard uri={item?.images?.original?.url} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Trending Gifs</Text>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.flatListContent}
        data={trendingGifs}
        numColumns={2}
        renderItem={renderGifs}
        ListEmptyComponent={() => (
          <ActivityIndicator size={26} color={Colors.black.default} />
        )}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

export const TrendingOptions = ({navigation}) => {
  return {
    headerTitle: 'Home',
    headerTitleAlign: 'center',
    headerStyle: {
      backgroundColor: Colors.white.default,
    },
    headerTitleStyle: {
      color: Colors.black.default,
    },
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Feather
          //   onPress={() => {
          //     navigation.navigate('Search');
          //   }}
          size={24}
          name="menu"
          color={Colors.black.default}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Feather
          onPress={() => {
            navigation.navigate('Search');
          }}
          size={24}
          name="search"
          color={Colors.black.default}
          style={{marginLeft: 20}}
        />
      </HeaderButtons>
    ),
  };
};

export default Trending;
