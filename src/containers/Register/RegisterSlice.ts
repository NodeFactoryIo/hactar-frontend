import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';
import {registerUser, User} from "./RegisterApi";

interface RegisterState {
    isLoading: boolean;
    error: string | null;
}
const initialState: RegisterState = {
    isLoading: false,
    error: null,
};

const register = createSlice({
    name: 'register',
    initialState,
    reducers: {
        registerStart(state: RegisterState) {
            state.isLoading = true;
        },
        registerSuccess(state: RegisterState) {
            state.isLoading = false;
            state.error = null;
        },
        registerError(state: RegisterState, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload;
        }
    }
});

const {
    registerStart,
    registerSuccess,
    registerError,
} = register.actions;

export const submitUserRegistration = (data: User): AppThunk => async dispatch => {
    try {
        dispatch(registerStart());
        const { email, password } = data;
        await registerUser(email, password);
        dispatch(registerSuccess());
    } catch (err) {
        dispatch(registerError(err.toString()));
    }
};
