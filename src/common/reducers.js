import { combineReducers } from 'redux';

import intl from './intl/intl.reducer';
import news from './news/news.reducer';

export default combineReducers({
  intl,
  news
});
