// Third party libraries
import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Button,
  Switch,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Spinner from 'react-native-loading-spinner-overlay';
import Feather from 'react-native-vector-icons/Feather';

//Defined components
import CustomHeaderButton from '../../components/common/CustomHeaderButton';
import Colors from '../../constants/Colors';
import {getExtraTrendingGif, getTrendingGif} from '../../store/giphy/thunk';
import {isDarkThemeSelector} from '../../store/theme/selector';
import {
  trendingExtraGifLoadingSelector,
  trendingGifSelector,
} from '../../store/giphy/selector';
import GiphyCard from '../../components/giphyCard';
import styles from './styles';
import DownloadGif from '../../utils/DownloadGif';
import WhatsappShare from '../../utils/WhatsappShare';
import {setTheme} from '../../store/theme/slice';
import {toggleGifPlaying} from '../../store/giphy/slice';

const Trending = () => {
  const dispatch = useDispatch();
  const trendingGifs = useSelector(trendingGifSelector);
  const listEndLoading = useSelector(trendingExtraGifLoadingSelector);
  const isDarkTheme = useSelector(isDarkThemeSelector);
  const [loading, setDownloadLoading] = useState(false);

  // handle first render
  useEffect(() => {
    dispatch(getTrendingGif());
  }, []);

  // handle infinite scrolling
  const loadExtraGifs = () => {
    dispatch(getExtraTrendingGif());
  };

  //play/stop Gifs
  const onPlayGif = (id, playing) => {
    dispatch(toggleGifPlaying({id: id, play: !playing, from: 'trending'}));
  };

  // render gifs
  const renderGifs = ({item}) => {
    return (
      <GiphyCard
        isPlaying={item?.isPlaying}
        onPlay={() => onPlayGif(item.id, item?.isPlaying)}
        isDarkTheme={isDarkTheme}
        onPressWhatsapp={() => WhatsappShare(item?.images?.original?.url)}
        onPressDownload={() =>
          DownloadGif(item?.images?.original?.url, e => setDownloadLoading(e))
        }
        uri={
          item?.isPlaying
            ? item?.images?.original?.url
            : item?.images?.original?.mp4
        }
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
      <ActivityIndicator
        size={24}
        color={isDarkTheme ? Colors.white.default : Colors.black.default}
      />
    );

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDarkTheme
            ? Colors.black.default
            : Colors.white.default,
        },
      ]}>
      <View style={styles.switchView}>
        <Text
          style={{
            color: isDarkTheme ? Colors.white.default : Colors.black.default,
          }}>
          Dark Mode
        </Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={isDarkTheme ? Colors.white.default : '#f4f3f4'}
          onChange={() => dispatch(setTheme(!isDarkTheme))}
          value={isDarkTheme}
        />
      </View>
      <Text
        style={[
          styles.header,
          {color: isDarkTheme ? Colors.white.default : Colors.black.default},
        ]}>
        Trending Gifs
      </Text>
      <FlatList
        style={styles.flatlist}
        contentContainerStyle={styles.flatListContent}
        data={trendingGifs}
        numColumns={2}
        renderItem={renderGifs}
        ListEmptyComponent={() => (
          <ActivityIndicator
            size={26}
            color={isDarkTheme ? Colors.white.default : Colors.black.default}
          />
        )}
        ListFooterComponent={ListFooterComponent}
      />
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={[
          styles.spinnerTextStyle,
          {color: isDarkTheme ? Colors.white.default : Colors.black.default},
        ]}
      />
    </View>
  );
};

export const TrendingOptions = ({navigation}) => {
  const isDarkTheme = useSelector(isDarkThemeSelector);
  return {
    headerTitle: 'Home',
    headerTitleAlign: 'center',

    headerStyle: {
      backgroundColor: isDarkTheme ? Colors.black.light : Colors.white.default,
    },
    headerTitleStyle: {
      color: isDarkTheme ? Colors.white.default : Colors.black.default,
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Feather
          onPress={() => {
            navigation.navigate('Search');
          }}
          size={24}
          name="search"
          color={isDarkTheme ? Colors.white.default : Colors.black.default}
          style={{marginLeft: 20}}
        />
      </HeaderButtons>
    ),
  };
};

export default Trending;
