// Third party libraries
import {
  Text,
  Button,
  View,
  FlatList,
  ActivityIndicator,
  Keyboard,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Spinner from 'react-native-loading-spinner-overlay';

//Defined components
import Colors from '../../constants/Colors';
import {
  getSearchedExtraTrendingGif,
  getSearchedTrendingGif,
} from '../../store/giphy/thunk';
import {
  searchedGifSelector,
  searchedGifLoadingSelector,
  searchedExtraGifLoadingSelector,
  errorSelector,
} from '../../store/giphy/selector';
import GiphyCard from '../../components/giphyCard';
import styles from './styles';
import {removeError, removeSearchedResult} from '../../store/giphy/slice';
import CustomSearchTextInput from '../../components/common/customSearchTextInput';
import WhatsappShare from '../../utils/WhatsappShare';
import DownloadGif from '../../utils/DownloadGif';

const Search = () => {
  const dispatch = useDispatch();
  const searchResult = useSelector(searchedGifSelector);
  const searchloading = useSelector(searchedGifLoadingSelector);
  const listEndLoading = useSelector(searchedExtraGifLoadingSelector);
  const error = useSelector(errorSelector);
  const [text, setText] = useState('');
  const [loading, setDownloadLoading] = useState(false);
  const textRef = useRef(null);

  // handle text
  const handleTextChange = text => {
    setText(text);
  };

  // handle search
  const searchGifs = () => {
    dispatch(getSearchedTrendingGif({q: text}));
    Keyboard.dismiss();
  };

  // handle infinite scroll
  const loadExtraGifs = () => {
    dispatch(getSearchedExtraTrendingGif({q: text}));
  };

  // cleanup function
  useEffect(() => {
    if (textRef.current) {
      textRef.current.focus();
    }
    return () => {
      dispatch(removeSearchedResult());
      dispatch(removeError());
    };
  }, []);

  // render gif's
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

  // flatlist footer component
  const ListFooterComponent = () =>
    !listEndLoading ? (
      searchResult.length != 0 ? (
        <Button onPress={loadExtraGifs} title="Load more" />
      ) : null
    ) : (
      <ActivityIndicator size={24} color={Colors.black.default} />
    );

  return (
    <View style={styles.container}>
      <CustomSearchTextInput
        ref={textRef}
        searchGifs={searchGifs}
        value={text}
        handleTextChange={handleTextChange}
      />
      {searchloading ? (
        <ActivityIndicator size={26} color={Colors.black.default} />
      ) : (
        <FlatList
          numColumns={2}
          style={styles.flatlist}
          contentContainerStyle={styles.flatListContent}
          renderItem={renderGifs}
          data={searchResult}
          ListFooterComponent={ListFooterComponent}
          ListEmptyComponent={() =>
            error != '' ? <Text style={styles.error}>{error}</Text> : null
          }
        />
      )}
      <Spinner
        visible={loading}
        textContent={'Loading...'}
        textStyle={styles.spinnerTextStyle}
      />
    </View>
  );
};

export default Search;
