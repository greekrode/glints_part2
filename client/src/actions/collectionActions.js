import axios from "axios";
import {
    ADD_COLLECTION_SUCCESS,
    ADD_COLLECTION_FAIL,
    FETCH_COLLECTION_FAIL,
    FETCH_COLLECTION_SUCCESS,
    DELETE_COLLECTION_SUCCESS,
    DELETE_COLLECTION_FAIL
} from "./types";
import { toast } from 'react-toastify';

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const addToCollection = restaurantData => dispatch => {
    axios
        .post("/api/collections", restaurantData)
        .then( res => {
            toast.success("Succesfully added to collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch ({
                type: ADD_COLLECTION_SUCCESS,
                payload: res.data
            })
        })
    .catch( err => {
            // console.log(err.response.data.message);
            toast.error("This item has been added to the collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch ({
                type: ADD_COLLECTION_FAIL,
                payload: err.response.data.message
            })
        })
};

export const getCollections = () => dispatch => {
    axios
        .get("/api/collections")
        .then(res => {
            dispatch(setCollectionData(res.data))
        })
        .catch(err => {
            dispatch({
                type: FETCH_COLLECTION_FAIL,
                payload: err.response.data.message
            })
        })
};

export const deleteCollection = collection => dispatch => {
    axios
        .delete("/api/collections/"+collection)
        .then(res => {
            toast.success("Succesfully delete collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch({
                type: DELETE_COLLECTION_SUCCESS,
                payload: collection
            })
        })
        .catch(err => {
            toast.error("Fail to delete collection", {
                position: toast.POSITION.TOP_RIGHT
            });
            dispatch({
                type: DELETE_COLLECTION_FAIL,
                payload: err
            })
        })
};

export const setCollectionData = collections => {
    return {
        type: FETCH_COLLECTION_SUCCESS,
        payload: collections
    }
};
