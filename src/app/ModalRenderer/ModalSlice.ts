import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";

export interface IConfirmationDialogProps {
    children: any;
    title: string;
    confirmationButtonLabel: string;
    onConfirmation: () => void;
}

interface IModalState {
    confirmationDialog: Array<IConfirmationDialogProps>;
}
const initialState: IModalState = {
    confirmationDialog: [],
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showConfirmationDialog(state: IModalState, action: PayloadAction<IConfirmationDialogProps>) {
            state.confirmationDialog.push(action.payload);
        },
        removeConfirmationDialog(state: IModalState) {
            state.confirmationDialog.pop();
        },
    },
});

export const {showConfirmationDialog, removeConfirmationDialog} = modalSlice.actions;
export default modalSlice.reducer;
