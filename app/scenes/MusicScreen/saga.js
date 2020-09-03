import { put, call, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { getMusic } from 'app/services/MusicService';
import { musicScreenActions, musicScreenTypes } from './reducer';

/**
 * A saga can contain multiple functions.
 *
 * This example saga contains only one to fetch fake user informations.
 * Feel free to remove it.
 */
export function* fetchMusic(action) {
  const { payload } = action;
  const response = yield call(getMusic, payload);

  if (response) {
    const { data } = response;
    yield put(musicScreenActions.successFetchMusic(data));
  } else {
    yield put(
      musicScreenActions.failureFetchMusic(
        'There was an error while fetching Music informations.'
      )
    );
  }
}

export default function* searchListContainerSaga() {
  yield takeLatest(musicScreenTypes.REQUEST_FETCH_MUSIC, fetchMusic);
}
