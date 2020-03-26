import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {nodePut, deleteNode, getNodesDetails} from "../../app/Api";
import {INodeDetails} from "../../@types/ReduxStates";
import {storeSelectedNode, resetAppState} from "../Dashboard/AppSlice";

interface IDataEntity {
    data: INodeDetails[];
    isLoading: boolean;
    error: string;
}

const defaultEntityProperties = {
    isLoading: true,
    error: "",
};

const initialState: IDataEntity = {
    ...defaultEntityProperties,
    data: [],
};

const nodeListSlice = createSlice({
    name: "information",
    initialState,
    reducers: {
        resetNodeList: (): IDataEntity => initialState,
        storeNodeListSuccess(state: IDataEntity, action: PayloadAction<Array<INodeDetails>>): void {
            state.data = action.payload.map((node) => ({
                ...node,
                name: node.name || `Node ${node.id}`,
            }));
            state.isLoading = false;
            state.error = "";
        },
    },
});

export const {resetNodeList, storeNodeListSuccess} = nodeListSlice.actions;
export const nodeListReducer = nodeListSlice.reducer;

export const getAllNodes = (): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const nodeListDetailsResponse = await getNodesDetails(token);
        dispatch(storeNodeListSuccess(nodeListDetailsResponse.data));

        if (nodeListDetailsResponse.data.length > 0) {
            let selectedNodeId = nodeListDetailsResponse.data[0].id;
            const savedSelectedNodeId = localStorage.getItem("selectedNodeId");
            if (!!savedSelectedNodeId) {
                // Check if node still exists
                for (let i = 0; i < nodeListDetailsResponse.data.length; i++) {
                    const node: INodeDetails = nodeListDetailsResponse.data[i];
                    if (node.id.toString() === localStorage.getItem("selectedNodeId")) {
                        selectedNodeId = node.id;
                        break;
                    }
                }
            }
            dispatch(storeSelectedNode(selectedNodeId));
        }
    } catch (err) {
        throw err;
    }
};

export const submitEditNode = (nodeId: number, submitData: any): AppThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    try {
        const token = getState().user.token;
        const nodeList: Array<INodeDetails> = getState().nodeList.data;
        const response = await nodePut(token, nodeId, submitData);

        if (response.data) {
            const updatedNodeList: Array<INodeDetails> = nodeList.slice();
            for (let index = 0; index < nodeList.length; index++) {
                if (nodeList[index].id === nodeId) {
                    updatedNodeList.splice(index, 1, response.data);
                    updatedNodeList[index].latestUptime = nodeList[index].latestUptime;
                    updatedNodeList[index].latestDiskInformation = nodeList[index].latestDiskInformation;
                    break;
                }
            }
            dispatch(storeNodeListSuccess(updatedNodeList));
        }
    } catch (err) {
        throw err;
    }
};

export const submitDeleteNode = (nodeId: number): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const response = await deleteNode(token, nodeId);
        if (response.status === 200) {
            if (nodeId.toString() === localStorage.getItem("selectedNodeId")) {
                localStorage.removeItem("selectedNodeId");
            }
            dispatch(resetNodeList());
            dispatch(resetAppState());
            dispatch(getAllNodes());
        }
    } catch (err) {
        throw err;
    }
};
