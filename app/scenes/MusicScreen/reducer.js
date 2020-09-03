import { createActions } from 'reduxsauce';
import { fromJS } from 'immutable';
import produce from 'immer';
export const {
  Types: musicScreenTypes,
  Creators: musicScreenActions
} = createActions({
  // Fetch Music informations
  requestFetchMusic: ['payload'],
  // Music information was successfully fetched
  successFetchMusic: ['music'],
  // An error occurred
  failureFetchMusic: ['errorMessage']
});

export const initialState = fromJS({
  music: [],
  musicIsLoading: false,
  musicErrorMessage: null
});

export const fetchMusic = state => {
  state.set('musicIsLoading', true).set('musicErrorMessage', null);
};

export const successFetchMusic = (state, { music }) =>
  state
    .set('music', music)
    .set('musicIsLoading', false)
    .set('musicErrorMessage', null);

export const failureFetchMusic = (state, { errorMessage }) =>
  state
    .set('music', [])
    .set('musicIsLoading', false)
    .set('musicErrorMessage', errorMessage);

/**
 * @see https://github.com/infinitered/reduxsauce#createreducer
 */
export const musicContainerReducer = (state = initialState, action) =>
  produce(state, () => {
    switch (action.type) {
      case musicScreenTypes.REQUEST_FETCH_MUSIC:
        return fetchMusic(state, action);
      case musicScreenTypes.SUCCESS_FETCH_MUSIC:
        return successFetchMusic(state, action);
      case musicScreenTypes.FAILURE_FETCH_MUSIC:
        return failureFetchMusic(state, action);
      default:
        return state;
    }
  });
