import axios from "axios";
import {
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAIL,
    FILTER_COLLECTION_SUCCESS,
    FILTER_COLLECTION_FAIL
} from "./types";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const getRestaurants = (onSuccess) => dispatch => {
    axios
        .get("/api/restaurants")
        .then(res => {
            onSuccess();
            dispatch(setRestaurantData(res.data))
        })
        .catch(err =>
            dispatch({
                type: FETCH_RESTAURANTS_FAIL,
                payload: err
        })
    );
};

export const filterRestaurants = (filterData, onSuccess) => dispatch => {
    console.log(filterData);
    axios
        .get("api/restaurants",{
            params: filterData
        })
        .then(res => {
            onSuccess();
            dispatch({
                type: FILTER_COLLECTION_SUCCESS,
                payload: res.data
            })
        })
        .catch(err => {
            dispatch({
                type: FILTER_COLLECTION_FAIL,
                payload: err
            })
        })
};

export const setRestaurantData = restaurants => {
    return {
        type: FETCH_RESTAURANTS_SUCCESS,
        payload: restaurants
    }
};

