import {
    FETCH_COLLECTION_SUCCESS,
    FETCH_COLLECTION_FAIL,
    DELETE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_FAIL
} from "../actions/types";

const initialState = {
    collection: [],
    modalType: null,
    modalProps: {}
};

export default function(state = initialState, action) {
    switch (action.type) {
        case FETCH_COLLECTION_SUCCESS:
            return {
                ...state,
                collection: action.payload
            };
        case FETCH_COLLECTION_FAIL:
            return {
                ...state
            };
        case DELETE_COLLECTION_SUCCESS:
            const filteredCollection = state.collection.filter((collection => collection._id !== action.payload) );
            return {
                ...state,
                collection: filteredCollection,
            };
        case DELETE_COLLECTION_FAIL:
            return {
                ...state,
            };
        default:
            return state;
    }
}