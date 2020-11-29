import { combineReducers } from 'redux';

import fetchNewsReducer from './fetchNews';
import voteCounterReducer from './voteCounter';

const rootReducer = combineReducers({
    news: fetchNewsReducer,
    vote_count: voteCounterReducer
});

export default rootReducer; 