import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {nodePut, deleteNode, getNodesDetails} from "../../app/Api";
import {INodesDetails} from "../../@types/ReduxStates";
import {storeSelectedNode} from "../Dashboard/AppSlice";
import {resetAppState} from "../../containers/Dashboard/AppSlice";

interface IDataEntity {
    data: INodesDetails[];
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
        storeNodeListSuccess(state: IDataEntity, action: PayloadAction<Array<INodesDetails>>): void {
            const nodesWithCompleteInfo = action.payload.map((node, index) => ({
                ...node,
                name: `Node ${index + 1}`,
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
        // const nodeListResponse = await getNodes(token);
        const nodesDetails = await getNodesDetails(token);
        console.log(nodesDetails);

        // Load disk sizes together
        // TODO: Will be replaced with better route

        // for (let index = 0; index < nodeListResponse.data.length; index++) {
        //     const response: INodeDiskStateResponse | any = await getDiskDetails(
        //         token,
        //         nodeListResponse.data[index].id,
        //         "year",
        //     );
        //     nodeListResponse.data[index].diskDetails = response.data[0];
        // }

        dispatch(storeNodeListSuccess(nodesDetails.data));

        if (nodesDetails.data.length > 0) {
            dispatch(storeSelectedNode(nodesDetails.data[0].node.id));
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
        const nodeList: Array<INodesDetails> = getState().nodeList.data;
        const response = await nodePut(token, nodeId, submitData);

        if (response.data) {
            const updatedNodeList: Array<INodesDetails> = nodeList.slice();
            for (let index = 0; index < nodeList.length; index++) {
                if (nodeList[index].node.id === nodeId) {
                    updatedNodeList.splice(index, 1, response.data);
                    // updatedNodeList[index].diskDetails = nodeList[index].diskDetails;
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
