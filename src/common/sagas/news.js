import { take, call, put } from 'redux-saga/effects';

const fetch = process.env.IS_BROWSER ? window.fetch : require('node-fetch');

const getNews = () => {
  return fetch(
    'https://api.rss2json.com/v1/api.json?rss_url=http%3A%2F%2Ffeeds.bbci.co.uk%2Fnews%2Fworld%2Frss.xml'
  ).then(p => p.json());
};

export function* watchGetNews() {
  while (true) {
    try {
      yield take('GET_NEWS');
      const news = yield call(getNews);
      yield put({
        type: 'GET_NEWS_SUCCESS',
        payload: { news }
      });
    } catch (error) {
      yield put({ type: 'GET_NEWS_FAIL', error });
    }
  }
}
