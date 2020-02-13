import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {IUser} from "../Register/RegisterApi";
import {logInUser} from "./LoginApi";

interface ILoginState {
    isLoading: boolean;
    success: boolean;
    error: string | null;
    token: string;
}
const initialState: ILoginState = {
    isLoading: false,
    success: false,
    error: null,
    token: "",
};

const loginSlice = createSlice({
    name: "login",
    initialState,
    reducers: {
        loginStart(state: ILoginState) {
            state.isLoading = true;
        },
        loginSuccess(state: ILoginState, action: PayloadAction<string>) {
            state.isLoading = false;
            state.success = true;
            state.error = null;
            state.token = action.payload;
        },
        loginError(state: ILoginState, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {loginStart, loginSuccess, loginError} = loginSlice.actions;
export default loginSlice.reducer;

export const submitUserLogin = (data: IUser): AppThunk => async dispatch => {
    try {
        dispatch(loginStart());
        const {email, password} = data;
        const response: any = await logInUser(email, password);
        if (response.status === 200) {
            dispatch(loginSuccess(response.data.token));
            localStorage.setItem("token", response.data.token);
        } else {
            const responseText = JSON.parse(response.request.responseText);
            dispatch(loginError(responseText.error));
        }
    } catch (err) {
        dispatch(loginError(err.toString()));
    }
};
