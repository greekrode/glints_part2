import {
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAIL,
    FILTER_COLLECTION_SUCCESS,
    FILTER_COLLECTION_FAIL
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
        case FILTER_COLLECTION_SUCCESS:
            return {
                ...state,
                restaurant: action.payload
            };
        case FILTER_COLLECTION_FAIL:
            return {
                ...state
            };
        default:
            return state;
    }
}