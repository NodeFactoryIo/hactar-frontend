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
        const nodeDetailsResponse = await getNodesDetails(token);
        console.log(nodeDetailsResponse);
        dispatch(storeNodeListSuccess(nodeDetailsResponse.data));

        if (nodeDetailsResponse.data.length > 0) {
            dispatch(storeSelectedNode(nodeDetailsResponse.data[0].id));
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
            dispatch(resetNodeList());
            dispatch(resetAppState());
            dispatch(getAllNodes());
        }
    } catch (err) {
        throw err;
    }
};
