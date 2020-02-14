import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {registerUser, IUser} from "./RegisterApi";
import {logInUser} from "../Login/LoginApi";

interface IUserState {
    isLoading: boolean;
    registerSuccessValue: boolean;
    registerErrorValue: string | null;
    loginSuccessValue: boolean;
    loginErrorValue: string | null;
    token: string | null;
}

const initialState: IUserState = {
    isLoading: false,
    registerSuccessValue: false,
    registerErrorValue: null,
    loginSuccessValue: false,
    loginErrorValue: null,
    token: localStorage.getItem("token")
};

const userSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        registerStart(state: IUserState) {
            state.isLoading = true;
        },
        registerSuccess(state: IUserState) {
            state.isLoading = false;
            state.registerErrorValue = null;
            state.registerSuccessValue = true;
        },
        registerError(state: IUserState, action: PayloadAction<string>) {
            state.isLoading = false;
            state.registerErrorValue = action.payload;
        },


        loginStart(state: IUserState) {
            state.isLoading = true;
        },
        loginSuccess(state: IUserState, action: PayloadAction<string>) {
            state.isLoading = false;
            state.loginSuccessValue = true;
            state.loginErrorValue = null;
            state.token = action.payload;
        },
        loginError(state: IUserState, action: PayloadAction<string>) {
            state.isLoading = false;
            state.loginErrorValue = action.payload;
        },
    },
});

export const {
    registerStart, 
    registerSuccess, 
    registerError,
    loginStart,
    loginSuccess,
    loginError
} = userSlice.actions;
export default userSlice.reducer;

export const submitUserRegistration = (data: IUser): AppThunk => async dispatch => {
    try {
        dispatch(registerStart());
        const {email, password} = data;
        const response = await registerUser(email, password);
        if (response.status === 201) dispatch(registerSuccess());
        else {
            const responseText = JSON.parse(response.request.responseText);
            dispatch(registerError(responseText.error));
        }
    } catch (err) {
        dispatch(registerError(err.toString()));
    }
};



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

