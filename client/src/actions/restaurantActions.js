import axios from "axios";
import {
    FETCH_RESTAURANTS_SUCCESS,
    FETCH_RESTAURANTS_FAIL
} from "./types";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export const getRestaurants = () => dispatch => {
    axios
        .get("/api/restaurants")
        .then(res => {
            console.log(res);
            // dispatch(setRestaurantData(restaurantData))
        })
        .catch(err =>
            dispatch({
                type: FETCH_RESTAURANTS_FAIL
        })
    );
};

export const setRestaurantData = restaurants => {
    return {
        type: FETCH_RESTAURANTS_SUCCESS,
        payload: restaurants
    }
}
