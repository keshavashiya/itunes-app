import { combineReducers } from 'redux';
import { exampleContainerReducer as example } from '@scenes/ExampleScreen/reducer';
import { musicContainerReducer as music } from '@scenes/MusicScreen/reducer';
import configureStore from 'app/utils/createStore';
import rootSaga from 'app/rootSaga';

export default () => {
  const rootReducer = combineReducers({
    example,
    music
  });

  return configureStore(rootReducer, rootSaga);
};
