import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {editNode} from "../Api";
import {getNodes} from "../../app/Api";
import {getNodeInformation} from "../../containers/GeneralInfo/GeneralInfoSlice";

export enum ModalType {
    EditNode,
}

export interface IModalState {
    type: ModalType | null;
}
const initialState: IModalState = {
    type: null
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        showConfirmationDialog(state: IModalState, action: PayloadAction<ModalType>) {
            state.type = action.payload;
        },
        removeConfirmationDialog(state: IModalState) {
            state.type = null
        },
    },
});


export const submitEditNode = (nodeId: number): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const nodeListResponse = await getNodes(token);

        const response = await editNode(token, nodeId.toString());
        console.log(response);

        if (response.status === 201) dispatch(getNodeInformation(nodeId));
        
    } catch (err) {
        throw err;
    }
};

export const {showConfirmationDialog, removeConfirmationDialog} = modalSlice.actions;
export default modalSlice.reducer;
