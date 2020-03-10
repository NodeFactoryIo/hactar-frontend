import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export enum ModalType {
    EditNode,
    Notifications,
}

export interface IModalState {
    type: ModalType | null;
}
const initialState: IModalState = {
    type: null,
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showConfirmationDialog(state: IModalState, action: PayloadAction<ModalType>) {
            state.type = action.payload;
        },
        removeConfirmationDialog(state: IModalState) {
            state.type = null;
        },
    },
});

export const {showConfirmationDialog, removeConfirmationDialog} = modalSlice.actions;
export const modalReducer = modalSlice.reducer;
