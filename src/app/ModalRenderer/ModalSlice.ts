import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {IEditNodeFormData} from "../../containers/GeneralInfo/EditNode/EditNodeForm";

export interface IConfirmationDialogProps {
    children: any;
    title: string;
    confirmationButtonLabel?: string;
    isForm: boolean;
    onConfirmation?: () => void;
    onEditNodeSubmit?: (submitData: IEditNodeFormData) => void;
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
