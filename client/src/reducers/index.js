import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import restaurantReducer from "./restaurantReducer";
import collectionReducer from "./collectionReducer";
import inviteReducer from "./inviteReducer";

export default combineReducers({
    auth: authReducer,
    restaurant: restaurantReducer,
    collection: collectionReducer,
    invite: inviteReducer,
    errors: errorReducer
});