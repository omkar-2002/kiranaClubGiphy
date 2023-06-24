import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import giphyReducer from './giphy/slice';

import themeReducer from './theme/slice';

const rootReducer = combineReducers({
  giphy: giphyReducer,
  theme: themeReducer,
  //   ...add other reducers if there
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: false,
});

export default store;
