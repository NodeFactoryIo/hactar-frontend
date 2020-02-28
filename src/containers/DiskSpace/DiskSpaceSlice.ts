import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {
    getDiskDetails,
} from "../Dashboard/DashboardApi";
import {INodeDiskState} from "../Dashboard/NodeInterface";

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

const diskSpaceSlice = createSlice({
    name: "diskSpace",
    initialState,
    reducers: {
        storeDiskInformation(state: IDataEntity, action: PayloadAction<INodeDiskState>): void {
            state.data = action.payload;
            state.isLoading = false;
            state.error = "";
        },
    },
});

export const {
    storeDiskInformation,
} = diskSpaceSlice.actions;
export default diskSpaceSlice.reducer;

export const getDiskInfo = (nodeId: number, interval: string): AppThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    try {
        const token = getState().user.token;
        const response = await getDiskDetails(token, nodeId, interval);
        dispatch(storeDiskInformation(response.data));
    } catch (err) {
        throw err;
    }
};
