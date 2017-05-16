import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import createSagaMiddleware, { END } from 'redux-saga';

import rootReducer from './reducers';

export default function create(initialState) {
  const sagaMiddleware = createSagaMiddleware();
  const loggerMiddleware = createLogger({
    collapsed: true
  });

  const middlewares = [sagaMiddleware, loggerMiddleware];

  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middlewares)
  );

  store.runSaga = sagaMiddleware.run;
  store.close = () => store.dispatch(END);

  // Enable hot reload for reducers
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextAppReducer = require('./reducers');

      store.replaceReducer(nextAppReducer);
    });
  }

  return store;
}
