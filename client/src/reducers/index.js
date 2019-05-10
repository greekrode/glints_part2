import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import restaurantReducer from "./restaurantReducer";

export default combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    errors: errorReducer
});