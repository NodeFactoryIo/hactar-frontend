import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {
    getDiskDetails,
    getNodes,
} from "../Dashboard/DashboardApi";
import {INodeDiskStateResponse, INodeState} from "../Dashboard/NodeInterface";
import {storeSelectedNode} from "../Dashboard/NodeSlice";

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
        storeNodeList(state: IDataEntity, action: PayloadAction<Array<INodeState>>): void {
            state.data = action.payload;
            state.isLoading = false;
            state.error = "";
        },
    },
});

export const {
    storeNodeList,
} = nodeListSlice.actions;
export default nodeListSlice.reducer;

export const getAllNodes = (): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const nodeListResponse = await getNodes(token);

        // Load disk sizes together
        // TODO: Will be replaced with better route
        for (let index = 0; index < nodeListResponse.length; index++) {
            const response: INodeDiskStateResponse = await getDiskDetails(token, nodeListResponse[index].id, "year");
            nodeListResponse.data.diskDetails = response.data[0];
        }
        dispatch(storeNodeList(nodeListResponse.data));
        if (nodeListResponse.data.length > 0) {
            dispatch(storeSelectedNode(1));
        }
    } catch (err) {
        throw err;
    }
};
