import {
  configureStore,
  combineReducers,
  applyMiddleware,
} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import giphyReducer from './giphy/slice';

const rootReducer = combineReducers({
  giphy: giphyReducer,
  //   ...add other reducers if there
});

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
  devTools: false,
});

export default store;
