import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import restaurantReducer from "./restaurantReducer";
import collectionReducer from "./collectionReducer";

export default combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    collection: collectionReducer,
    errors: errorReducer
});