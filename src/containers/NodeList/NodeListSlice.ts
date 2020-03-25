import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {getDiskDetails, getNodes, nodePut, deleteNode} from "../../app/Api";
import {INodeDiskStateResponse, INodeState} from "../../@types/ReduxStates";
import {storeSelectedNode} from "../Dashboard/AppSlice";
import {resetAppState} from "../../containers/Dashboard/AppSlice";

interface IDataEntity {
    data: any;
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
        storeNodeListSuccess(state: IDataEntity, action: PayloadAction<Array<INodeState>>): void {
            const nodesWithCompleteInfo = action.payload.map((node, index) => ({
                ...node,
                name: node.name || `Node ${index + 1}`,
            }));
            state.data = nodesWithCompleteInfo;
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
        const nodeListResponse = await getNodes(token);
        // Load disk sizes together
        // TODO: Will be replaced with better route
        for (let index = 0; index < nodeListResponse.data.length; index++) {
            const response: INodeDiskStateResponse | any = await getDiskDetails(
                token,
                nodeListResponse.data[index].id,
                "year",
            );
            nodeListResponse.data[index].diskDetails = response.data[0];
        }
        dispatch(storeNodeListSuccess(nodeListResponse.data));
        if (nodeListResponse.data.length > 0) {
            let selectedNodeId = nodeListResponse.data[0].id;
            const savedSelectedNodeId = localStorage.getItem("selectedNodeId");
            if (!!savedSelectedNodeId) {
                // Check if node still exists
                for (let i = 0; i < nodeListResponse.data.length; i++) {
                    const node: INodeState = nodeListResponse.data[i];
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
        const nodeList: Array<INodeState> = getState().nodeList.data;
        const response = await nodePut(token, nodeId, submitData);

        if (response.data) {
            const updatedNodeList: Array<INodeState> = nodeList.slice();
            for (let index = 0; index < nodeList.length; index++) {
                if (nodeList[index].id === nodeId) {
                    updatedNodeList.splice(index, 1, response.data);
                    updatedNodeList[index].diskDetails = nodeList[index].diskDetails;
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
            localStorage.removeItem("selectedNodeId");
            dispatch(resetNodeList());
            dispatch(resetAppState());
            dispatch(getAllNodes());
        }
    } catch (err) {
        throw err;
    }
};
