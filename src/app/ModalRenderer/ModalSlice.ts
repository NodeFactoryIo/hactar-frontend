import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";

export enum ModalType {
    EditNode = "EDITNODE",
}

export interface IModalState {
    confirmationDialog: ModalType | null;
}
const initialState: IModalState = {
    confirmationDialog: null
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showConfirmationDialog(state: IModalState, action: PayloadAction<ModalType>) {
            state.confirmationDialog = action.payload;
        },
        removeConfirmationDialog(state: IModalState) {
            state.confirmationDialog = null
        },
    },
});

export const {showConfirmationDialog, removeConfirmationDialog} = modalSlice.actions;
export default modalSlice.reducer;
