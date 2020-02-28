import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {getLatestNodeVersion, getMinerInfo} from "../../app/Api";
import {INodeInfoState} from "../../@types/ReduxStates";

interface IDataEntity {
    data: any;
    isLoading: boolean;
    error: string;
}

const defaultEntityProperties = {
    isLoading: true,
    error: "",
};

interface IState extends IDataEntity {
    latestAvailableVersion: null | string;
}

const initialState: IState = {
    ...defaultEntityProperties,
    data: {},
    latestAvailableVersion: null,
};

const generalInfoSlice = createSlice({
    name: "information",
    initialState,
    reducers: {
        storeNodeInformation(state: IState, action: PayloadAction<INodeInfoState>): void {
            state.data = action.payload;
            state.isLoading = false;
            state.error = "";
        },
        storeLatestNodeVersion(state: IState, action: PayloadAction<string>): void {
            state.latestAvailableVersion = action.payload;
        },
    },
});

export const {storeNodeInformation, storeLatestNodeVersion} = generalInfoSlice.actions;
export const generalInfoReducer = generalInfoSlice.reducer;

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

export const getAvailableNodeVersion = (): AppThunk => async (dispatch): Promise<void> => {
    try {
        const response = await getLatestNodeVersion();
        if (response.data) {
            if (response.data.length > 0 && response.data[0].name) {
                dispatch(storeLatestNodeVersion(response.data[0].name.substring(1)));
            }
        }
    } catch (err) {
        throw err;
    }
};
