import { createSelector } from 'reselect';
import get from 'lodash/get';
import { initialState } from './reducer';

export const selectMusicDomain = state => (state.music || initialState).toJS();

export const selectMusic = () =>
  createSelector(selectMusicDomain, substate => get(substate, 'music', null));

export const selectMusicIsLoading = () =>
  createSelector(selectMusicDomain, substate =>
    get(substate, 'musicIsLoading', null)
  );

export const selectMusicErrorMessage = () =>
  createSelector(selectMusicDomain, substate =>
    get(substate, 'musicErrorMessage', null)
  );
