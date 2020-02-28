import {combineReducers} from "@reduxjs/toolkit";
import userReducer from "../containers/Register/UserSlice";
import nodeReducer from "../containers/Dashboard/NodeSlice";
import modalReducer from "./ModalRenderer/ModalSlice";

const rootReducer = combineReducers({
    user: userReducer,
    node: nodeReducer,
    modal: modalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
