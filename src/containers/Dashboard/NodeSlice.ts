import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {
    getNodes,
    getMinerInfo,
    getDiskDetails,
    getBalance,
    getLatestNodeVersion,
    fetchMiningRewards,
} from "./DashboardApi";
import {
    INodeState,
    INodeInfoState,
    INodeDiskState,
    INodeBalance,
    IMiningReward,
    INodeDiskStateResponse,
} from "./NodeInterface";

interface IDataEntity {
    data: any;
    isLoading: boolean;
    error: string;
}

const defaultEntityProperties = {
    isLoading: true,
    error: "",
};

interface IState {
    nodeList: Array<INodeState>;
    nodeInfo: INodeInfoState | null;
    nodeDiskInfoList: Array<INodeDiskState>;
    nodeDiskInfo: Array<INodeDiskState>;
    nodeBalance: INodeBalance | null;
    latestNodeVersion: string | null;
    miningRewards: IDataEntity & {
        data: Array<IMiningReward>;
    };
}
const initialState: IState = {
    nodeList: [],
    nodeInfo: null,
    nodeDiskInfoList: [],
    nodeDiskInfo: [],
    nodeBalance: null,
    latestNodeVersion: null,
    miningRewards: {
        ...defaultEntityProperties,
        data: [],
    },
};

const nodeSlice = createSlice({
    name: "node",
    initialState,
    reducers: {
        resetNodeState: (): IState => initialState,
        storeNodeList(state: IState, action: PayloadAction<Array<INodeState>>): void {
            state.nodeList = action.payload;
        },
        storeNodeInfo(state: IState, action: PayloadAction<INodeInfoState>): void {
            state.nodeInfo = action.payload;
        },
        storeDiskInfoList(state: IState, action: PayloadAction<Array<INodeDiskState>>): void {
            state.nodeDiskInfoList = action.payload;
        },
        storeDiskInfo(state: IState, action: PayloadAction<Array<INodeDiskState>>): void {
            state.nodeDiskInfo = action.payload;
        },
        storeBalanceInfo(state: IState, action: PayloadAction<INodeBalance>): void {
            state.nodeBalance = action.payload;
        },
        storeLatestNodeVersion(state: IState, action: PayloadAction<string>): void {
            state.latestNodeVersion = action.payload;
        },
        storeMiningRewardsSuccess(state: IState, action: PayloadAction<Array<IMiningReward>>): void {
            state.miningRewards.data = action.payload;
            state.miningRewards.isLoading = false;
            state.miningRewards.error = "";
        },
        storeMiningRewardsError(state: IState, action: PayloadAction<string>): void {
            state.miningRewards.error = action.payload;
        },
    },
});

export const {
    resetNodeState,
    storeNodeList,
    storeNodeInfo,
    storeDiskInfoList,
    storeDiskInfo,
    storeBalanceInfo,
    storeLatestNodeVersion,
    storeMiningRewardsSuccess,
    storeMiningRewardsError,
} = nodeSlice.actions;
export default nodeSlice.reducer;

export const getNodeList = (): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const nodeListResponse = await getNodes(token);
        dispatch(storeNodeList(nodeListResponse.data));
    } catch (err) {
        throw err;
    }
};

export const getGeneralInfo = (nodeId: number): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const nodeInfoResponse = await getMinerInfo(token, nodeId);
        dispatch(
            storeNodeInfo({
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

export const getDiskInfoList = (nodeList: Array<INodeState>): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const diskDetailsList: Array<INodeDiskState> = [];
        for (let index = 0; index < nodeList.length; index++) {
            const response: INodeDiskStateResponse = await getDiskDetails(token, nodeList[index].id, "year");
            diskDetailsList.push(response.data[0]);
        }
        dispatch(storeDiskInfoList(diskDetailsList));
    } catch (err) {
        throw err;
    }
};

export const getDiskInfo = (nodeId: number, interval: string): AppThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    try {
        const token = getState().user.token;
        const response = await getDiskDetails(token, nodeId, interval);
        dispatch(storeDiskInfo(response.data));
    } catch (err) {
        throw err;
    }
};

export const getBalanceInfo = (nodeId: number): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const response = await getBalance(token, nodeId);
        dispatch(
            storeBalanceInfo({
                currentBalance: response.data.currentBalance,
                updatedAt: response.data.updatedAt,
                balanceChangePerc: response.data.balanceChangePerc,
                balanceChange: response.data.balanceChange,
            }),
        );
    } catch (err) {
        throw err;
    }
};

export const getNodeVersion = (): AppThunk => async (dispatch): Promise<void> => {
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

export const getMiningRewards = (nodeId: number, interval = "Week"): AppThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    try {
        const token = getState().user.token;
        const response = await fetchMiningRewards(token, nodeId, interval);
        if (response.data) {
            dispatch(storeMiningRewardsSuccess(response.data));
        }
    } catch (err) {
        dispatch(storeMiningRewardsError(err.message));
    }
};
