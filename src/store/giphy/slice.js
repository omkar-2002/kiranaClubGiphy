import {createSlice} from '@reduxjs/toolkit';
import {
  getTrendingGif,
  getExtraTrendingGif,
  getSearchedTrendingGif,
  getSearchedExtraTrendingGif,
} from './thunk';

const initialState = {
  trendingGif: [],
  trendingGifLoading: false,
  trendingGifOffset: 0,
  trendingExtraGifLoading: false,

  searchedGif: [],
  searchedGifLoading: false,
  searchedGifOffset: 0,
  searchedExtraGifLoading: false,

  error: '',
};

const giphySlice = createSlice({
  name: 'giphy',
  initialState,
  reducers: {
    removeSearchedResult(state) {
      console.log("Called")
      state.searchedGif = [];
    },
  },
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

    builder.addCase(getSearchedTrendingGif.pending, (state, {payload}) => {
      state.searchedGifLoading = true;
    }),
      builder.addCase(getSearchedTrendingGif.fulfilled, (state, {payload}) => {
        state.searchedGif = payload;
        state.searchedGifLoading = false;
      }),
      builder.addCase(getSearchedTrendingGif.rejected, (state, {payload}) => {
        state.error = payload;
        state.searchedGifLoading = false;
      });

    builder.addCase(getSearchedExtraTrendingGif.pending, (state, {payload}) => {
      state.searchedExtraGifLoading = true;
    }),
      builder.addCase(
        getSearchedExtraTrendingGif.fulfilled,
        (state, {payload}) => {
          state.searchedGif = state.searchedGif.concat(payload.data);
          state.searchedGifOffset = payload.offset;
          state.searchedExtraGifLoading = false;
        },
      ),
      builder.addCase(
        getSearchedExtraTrendingGif.rejected,
        (state, {payload}) => {
          state.error = payload;
          state.searchedExtraGifLoading = false;
        },
      );
  },
});

export const {removeSearchedResult} = giphySlice.actions;

export default giphySlice.reducer;
