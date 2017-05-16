import { fork } from 'redux-saga/effects';
import { watchGetNews } from './news';

export default function* root() {
  yield [fork(watchGetNews)];
}
