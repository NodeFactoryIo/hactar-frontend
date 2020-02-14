import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "../containers/Register/UserSlice";


const rootReducer = combineReducers({
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
