import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {editNode} from "../Api";
import {IEditNodeFormData} from "../../containers/GeneralInfo/EditNode/EditNodeForm";
import {storeNodeList} from "../../containers/NodeList/NodeListSlice";
import {INodeState} from "../../@types/ReduxStates";

export enum ModalType {
    EditNode,
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

export const submitEditNode = (nodeId: number, submitData: IEditNodeFormData): AppThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    try {
        const token = getState().user.token;
        const nodeList: Array<INodeState> = getState().nodeList.data;
        const selectedNodeId = getState().app.selectedNodeId;
        const response = await editNode(token, nodeId, submitData);

        if (response.data) {
            const updatedNodeList: Array<INodeState> = nodeList.slice();
            for (let index = 0; index < nodeList.length; index++) {
                if (nodeList[index].id === selectedNodeId) {
                    updatedNodeList.splice(index, 1, response.data);
                    updatedNodeList[index].diskDetails = nodeList[index].diskDetails;
                }
            }
            dispatch(storeNodeList(updatedNodeList));
        }
    } catch (err) {
        throw err;
    }
};

export const {showConfirmationDialog, removeConfirmationDialog} = modalSlice.actions;
export default modalSlice.reducer;
