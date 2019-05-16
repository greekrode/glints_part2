import axios from "axios";
import {
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAIL
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

export const setRestaurantData = restaurants => {
    return {
        type: FETCH_RESTAURANTS_SUCCESS,
        payload: restaurants
    }
};

