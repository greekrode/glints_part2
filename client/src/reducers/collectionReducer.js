import {
    FETCH_COLLECTION_SUCCESS,
    FETCH_COLLECTION_FAIL,
    DELETE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_FAIL,
    FETCH_COLLECTION_DATA_FAIL,
    FETCH_COLLECTION_DATA_SUCCESS,
    FETCH_COLLABORATIVE_COLLECTION_SUCCESS,
    FETCH_COLLABORATIVE_COLLECTION_FAIL,
    ADD_COLLECTION_SUCCESS,
    ADD_COLLECTION_FAIL, DELETE_FROM_COLLECTION_SUCCESS
} from "../actions/types";

const initialState = {
    collection: [],
    collaborativeCollection: [],
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
        case FETCH_COLLABORATIVE_COLLECTION_SUCCESS:
            return {
                ...state,
                collaborativeCollection: action.payload
            };
        case FETCH_COLLABORATIVE_COLLECTION_FAIL:
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
        case FETCH_COLLECTION_DATA_SUCCESS:
            return {
                ...state,
                collection: action.payload
            };
        case FETCH_COLLECTION_DATA_FAIL:
            return {
                ...state,
            };
        case ADD_COLLECTION_SUCCESS:
            return {
                ...state,
                collection: action.payload
            };
        case ADD_COLLECTION_FAIL:
            return {
                ...state
            };
        case DELETE_FROM_COLLECTION_SUCCESS:
            const filtered = state.collection.filter((collection => collection._id !== action.payload) );
            return {
                ...state,
                collection: filtered,
            };
        default:
            return state;
    }
}