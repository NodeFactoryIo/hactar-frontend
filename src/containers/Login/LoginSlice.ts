import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {IUser} from "../Register/RegisterApi";
import {logInUser} from "./LoginApi";

interface ILoginState {
    isLoading: boolean;
    success: boolean;
    error: string | null;
}
const initialState: ILoginState = {
    isLoading: false,
    success: false,
    error: null,
}

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginStart(state: ILoginState) {
            state.isLoading = true;
        },
        loginSuccess(state: ILoginState) {
            state.isLoading = false;
            state.success = true;
            state.error = null;
        },
        loginError(state: ILoginState, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    }
});

export const {loginStart, loginSuccess, loginError} = loginSlice.actions;
export default loginSlice.reducer;

export const submitUserLogin = (data: IUser): AppThunk => async dispatch => {
    try{
        dispatch(loginStart());
        const {email, password} = data;
        const response = await logInUser(email, password);
        console.log(response);
    } catch {

    }
};