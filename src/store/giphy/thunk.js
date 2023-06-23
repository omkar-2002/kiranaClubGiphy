import {createAsyncThunk} from '@reduxjs/toolkit';
import Config from 'react-native-config';
import axios from 'axios';

export const getTrendingGif = createAsyncThunk(
  'api.giphy.com/v1/gifs/trending',
  (payload, {dispatch, getState}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          giphy: {trendingGifOffset},
        } = getState();
        const res = await axios.get('https://api.giphy.com/v1/gifs/trending', {
          params: {
            offset: trendingGifOffset,
            api_key: 'kmVYJiRB2t0A6YxVgLofiCZI5hmTtTML',
            limit: 10,
          },
        });
        resolve(res.data.data);
      } catch (err) {
        reject(err);
      }
    });
  },
);

export const getExtraTrendingGif = createAsyncThunk(
  'api.giphy.com/v1/gifs/trending/extra',
  (payload, {dispatch, getState}) => {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          giphy: {trendingGifOffset},
        } = getState();
        console.log('Aloy mi');
        const offsetIndex = trendingGifOffset + 10;
        console.log(offsetIndex);
        const res = await axios.get('https://api.giphy.com/v1/gifs/trending', {
          params: {
            api_key: 'kmVYJiRB2t0A6YxVgLofiCZI5hmTtTML',
            offset: offsetIndex,
            limit: 10,
          },
        });
        resolve({data: res.data.data, offset: offsetIndex});
      } catch (err) {
        console.log("err=>",err)
        reject(err);
      }
    });
  },
);
