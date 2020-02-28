import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {
    getMinerInfo,
} from "../Dashboard/DashboardApi";
import {INodeInfoState} from "../Dashboard/NodeInterface";

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
    data: {},
};

const generalInfoSlice = createSlice({
    name: "information",
    initialState,
    reducers: {
        storeNodeInformation(state: IDataEntity, action: PayloadAction<INodeInfoState>): void {
            state.data = action.payload;
            state.isLoading = false;
            state.error = "";
        },
    },
});

export const {
    storeNodeInformation,
} = generalInfoSlice.actions;
export default generalInfoSlice.reducer;

export const getNodeInformation = (nodeId: number): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const nodeInfoResponse = await getMinerInfo(token, nodeId);
        dispatch(
            storeNodeInformation({
                version: nodeInfoResponse.data.version,
                walletAddress: nodeInfoResponse.data.walletAddress,
                sectorSize: nodeInfoResponse.data.sectorSize,
                numberOfSectors: nodeInfoResponse.data.numberOfSectors,
                minerPower: nodeInfoResponse.data.minerPower,
                totalPower: nodeInfoResponse.data.totalPower,
                createdAt: nodeInfoResponse.data.createdAt,
                updatedAt: nodeInfoResponse.data.updatedAt,
            }),
        );
    } catch (err) {
        throw err;
    }
};