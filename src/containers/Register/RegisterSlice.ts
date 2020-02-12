import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {registerUser, IUser} from "./RegisterApi";

interface IRegisterState {
    isLoading: boolean;
    success: boolean;
    error: string | null;
}
const initialState: IRegisterState = {
    isLoading: false,
    success: false,
    error: null,
};

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        registerStart(state: IRegisterState) {
            state.isLoading = true;
        },
        registerSuccess(state: IRegisterState) {
            state.isLoading = false;
            state.error = null;
            state.success = true;
        },
        registerError(state: IRegisterState, action: PayloadAction<any>) {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const {registerStart, registerSuccess, registerError} = registerSlice.actions;

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

export default registerSlice.reducer;
