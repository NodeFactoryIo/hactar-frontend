import {combineReducers} from "@reduxjs/toolkit";
import registerReducer from "../containers/Register/RegisterSlice";
import loginReducer from "../containers/Login/LoginSlice";

const rootReducer = combineReducers({
    register: registerReducer,
    login: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
