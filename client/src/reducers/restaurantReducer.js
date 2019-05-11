import {
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAIL
} from "../actions/types";

const initialState = {
    restaurant: [],
    loading: false
};

export default function(state = initialState, action) {
    switch (action.type) {
      case FETCH_RESTAURANTS_SUCCESS:
        return {
            ...state,
            restaurant: action.payload
        };
        case FETCH_RESTAURANTS_FAIL:
        return {
            ...state,
        };
        default:
            return state;
    }
}