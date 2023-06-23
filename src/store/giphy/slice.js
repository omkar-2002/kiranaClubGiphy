import {createSlice} from '@reduxjs/toolkit';
import {getTrendingGif, getExtraTrendingGif} from './thunk';
const initialState = {
  trendingGif: [],
  trendingGifLoading: false,
  trendingGifOffset: 0,
  trendingExtraGifLoading: false,

  searchedGif: [],
  searchedGifLoading: false,
  searchedGifOffset: 0,

  error: '',
};

const giphySlice = createSlice({
  name: 'giphy',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getTrendingGif.pending, (state, {payload}) => {
      state.trendingGifLoading = true;
    }),
      builder.addCase(getTrendingGif.fulfilled, (state, {payload}) => {
        state.trendingGif = payload;
        state.trendingGifLoading = false;
      }),
      builder.addCase(getTrendingGif.rejected, (state, {payload}) => {
        state.error = payload;
        state.trendingGifLoading = false;
      });

    builder.addCase(getExtraTrendingGif.pending, (state, {payload}) => {
      state.trendingExtraGifLoading = true;
    }),
      builder.addCase(getExtraTrendingGif.fulfilled, (state, {payload}) => {
        state.trendingGif = state.trendingGif.concat(payload.data);
        state.trendingGifOffset = payload.offset;
        state.trendingExtraGifLoading = false;
      }),
      builder.addCase(getExtraTrendingGif.rejected, (state, {payload}) => {
        state.error = payload;
        state.trendingExtraGifLoading = false;
      });
  },
});

export const {} = giphySlice.actions;

export default giphySlice.reducer;
