import {combineReducers} from "@reduxjs/toolkit";
import registerReducer from "../containers/Register/RegisterSlice";

const rootReducer = combineReducers({
    register: registerReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
