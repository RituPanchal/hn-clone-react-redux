import { FETCH_NEWS } from '../utils/constants';

const initialState = {
    news: '',
};

const fetchNewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_NEWS: {
            const newState = {
                ...state,
                news: action.payload,
            };
            return newState;
        }
        default:
            return state;
    }
};

export default fetchNewsReducer; 