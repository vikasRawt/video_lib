import { combineReducers } from 'redux';
import videoReducer from './VideoReducers';

const rootReducer = combineReducers({
  video: videoReducer
});

export default rootReducer;
