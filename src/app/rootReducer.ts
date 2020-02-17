import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "../containers/Register/UserSlice";
import nodeReducer from "../containers/Dashboard/NodeSlice";

const rootReducer = combineReducers({
    user: userReducer,
    node: nodeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
