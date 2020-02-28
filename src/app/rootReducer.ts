import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "../containers/Register/UserSlice";
import nodeReducer from "../containers/Dashboard/NodeSlice";
import nodeListReducer from "../containers/NodeList/NodeListSlice";

const rootReducer = combineReducers({
    user: userReducer,
    nodeList: nodeListReducer,
    node: nodeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
