import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import Colors from '../../constants/Colors';
import {
  getSearchedExtraTrendingGif,
  getSearchedTrendingGif,
} from '../../store/giphy/thunk';
import {
  searchedGifSelector,
  searchedGifLoadingSelector,
  searchedExtraGifLoadingSelector,
} from '../../store/giphy/selector';
import {TouchableOpacity} from 'react-native';
import GiphyCard from '../../components/giphyCard';
import styles from './styles';
import {removeSearchedResult} from '../../store/giphy/slice';
import CustomSearchTextInput from '../../components/common/customSearchTextInput';

const Search = () => {
  const dispatch = useDispatch();
  const searchResult = useSelector(searchedGifSelector);
  const loading = useSelector(searchedGifLoadingSelector);
  const listEndLoading = useSelector(searchedExtraGifLoadingSelector);
  const [text, setText] = useState('');

  // handle text
  const handleTextChange = text => {
    setText(text);
  };

  // handle search
  const searchGifs = () => {
    dispatch(getSearchedTrendingGif({q: text}));
  };

  // handle infinite scroll
  const loadExtraGifs = () => {
    dispatch(getSearchedExtraTrendingGif({q: text}));
  };

  // cleanup function
  useEffect(() => {
    return () => dispatch(removeSearchedResult());
  }, []);

  // render gif's
  const renderGifs = ({item}) => {
    return <GiphyCard uri={item?.images?.original?.url} />;
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
        searchGifs={searchGifs}
        value={text}
        handleTextChange={handleTextChange}
      />
      {loading ? (
        <ActivityIndicator size={26} color={Colors.black.default} />
      ) : (
        <FlatList
          numColumns={2}
          style={styles.flatlist}
          contentContainerStyle={styles.flatListContent}
          renderItem={renderGifs}
          data={searchResult}
          ListFooterComponent={ListFooterComponent}
        />
      )}
    </View>
  );
};

export default Search;
