// Third party libraries
import {Text, View, FlatList, ActivityIndicator, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';

//Defined components
import CustomHeaderButton from '../../components/common/CustomHeaderButton';
import Colors from '../../constants/Colors';
import {getExtraTrendingGif, getTrendingGif} from '../../store/giphy/thunk';
import {
  trendingExtraGifLoadingSelector,
  trendingGifSelector,
} from '../../store/giphy/selector';
import GiphyCard from '../../components/giphyCard';
import styles from './styles';
import DownloadGif from '../../utils/DownloadGif';
import WhatsappShare from '../../utils/WhatsappShare';

const Trending = () => {
  const dispatch = useDispatch();
  const trendingGifs = useSelector(trendingGifSelector);
  const listEndLoading = useSelector(trendingExtraGifLoadingSelector);
  const [loading, setDownloadLoading] = useState(false);

  // handle first render
  useEffect(() => {
    dispatch(getTrendingGif());
  }, []);

  // handle infinite scrolling
  const loadExtraGifs = () => {
    dispatch(getExtraTrendingGif());
  };

  // render gifs
  const renderGifs = ({item}) => {
    return (
      <GiphyCard
        onPressWhatsapp={() => WhatsappShare(item?.images?.original?.url)}
        onPressDownload={() =>
          DownloadGif(item?.images?.original?.url, e => setDownloadLoading(e))
        }
        uri={item?.images?.original?.url}
      />
    );
  };

  // render footer
  const ListFooterComponent = () =>
    !listEndLoading ? (
      trendingGifs.length != 0 ? (
        <Button title="Load more" onPress={loadExtraGifs} />
      ) : null
    ) : (
      <ActivityIndicator size={24} color={Colors.black.default} />
    );

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
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
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
