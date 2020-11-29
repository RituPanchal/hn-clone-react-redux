import { UPVOTE_COUNT } from '../utils/constants';

const initialState = {
    vote_count: '',
};

const voteCounterReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPVOTE_COUNT: {
            const newState = {
                ...state,
                vote_count: action.payload,
            };
            return newState;
        }
        default:
            return state;
    }
};

export default voteCounterReducer; 