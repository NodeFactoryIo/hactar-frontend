import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {getDiskDetails, getNodes} from "../../app/Api";
import {INodeDiskStateResponse, INodeState} from "../../@types/ReduxStates";
import {storeSelectedNode} from "../Dashboard/AppSlice";

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
        storeNodeList(state: IDataEntity, action: PayloadAction<Array<INodeState>>): void {
            state.data = action.payload;
            state.isLoading = false;
            state.error = "";
        },
    },
});

export const {resetNodeList, storeNodeList} = nodeListSlice.actions;
export const nodeListReducer = nodeListSlice.reducer;

export const getAllNodes = (): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const nodeListResponse = await getNodes(token);

        // Load disk sizes together
        // TODO: Will be replaced with better route
        for (let index = 0; index < nodeListResponse.data.length; index++) {
            const response: INodeDiskStateResponse = await getDiskDetails(
                token,
                nodeListResponse.data[index].id,
                "year",
            );
            nodeListResponse.data[index].diskDetails = response.data[0];
        }
        dispatch(storeNodeList(nodeListResponse.data));
        if (nodeListResponse.data.length > 0) {
            dispatch(storeSelectedNode(1));
        }
    } catch (err) {
        throw err;
    }
};
