import { fork } from 'redux-saga/effects';
import exampleSaga from '@scenes/ExampleScreen/saga';
import startupSaga from '@scenes/RootScreen/saga';
import musicSaga from '@scenes/MusicScreen/saga';

export default function* root() {
  yield fork(exampleSaga);
  yield fork(startupSaga);
  yield fork(musicSaga);
}
