import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import rootReducer from './reducers';

export default function create(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(
      createLogger({
        collapsed: true
      })
    )
  );
}
