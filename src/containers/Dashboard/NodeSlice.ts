import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {getNodes, getMinerInfo, getDiskDetails, getBalance} from "./DashboardApi";
import {INodeState, INodeInfoState, INodeDiskState, INodeBalance} from "./NodeInterface";

interface IState {
    isLoading: boolean;
    nodeList: Array<INodeState>;
    nodeInfo: INodeInfoState | null;
    nodeDiskInfo: Array<INodeDiskState>;
    nodeBalance: INodeBalance | null;
}
const initialState: IState = {
    isLoading: false,
    nodeList: [],
    nodeInfo: null,
    nodeDiskInfo: [],
    nodeBalance: null,
};

const nodeSlice = createSlice({
    name: "node",
    initialState,
    reducers: {
        isLoading(state: IState): void {
            state.isLoading = true;
        },
        storeNodeList(state: IState, action: PayloadAction<Array<INodeState>>): void {
            state.nodeList = action.payload;
        },
        storeNodeInfo(state: IState, action: PayloadAction<INodeInfoState>): void {
            state.nodeInfo = action.payload;
        },
        storeDiskInfo(state: IState, action: PayloadAction<Array<INodeDiskState>>): void {
            state.nodeDiskInfo = action.payload;
        },
        storeBalanceInfo(state: IState, action: PayloadAction<INodeBalance>): void {
            state.nodeBalance = action.payload;
        },
    },
});

export const {isLoading, storeNodeList, storeNodeInfo, storeDiskInfo, storeBalanceInfo} = nodeSlice.actions;
export default nodeSlice.reducer;

export const getNodeList = (): AppThunk => async (dispatch, getState) => {
    try {
        const token = getState().user.token;
        const nodeListResponse = await getNodes(token);
        dispatch(storeNodeList(nodeListResponse.data));
        dispatch(isLoading());
    } catch (err) {
        throw err;
    }
};

export const getGeneralInfo = (nodeId: number): AppThunk => async (dispatch, getState) => {
    try {
        const token = getState().user.token;
        const nodeInfoResponse = await getMinerInfo(token, nodeId);
        dispatch(
            storeNodeInfo({
                version: nodeInfoResponse.data.version,
                sectorSize: nodeInfoResponse.data.sectorSize,
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

export const getDiskInfoList = (nodeList: Array<INodeState>): AppThunk => async (dispatch, getState) => {
    try {
        const token = getState().user.token;
        const diskDetailsList: Array<INodeDiskState> = [];
        for (let index = 0; index < nodeList.length; index++) {
            const response: any = await getDiskDetails(token, nodeList[index].id);
            diskDetailsList.push({
                id: response.data[0].id,
                freeSpace: response.data[0].freeSpace,
                takenSpace: response.data[0].takenSpace,
                createdAt: response.data[0].createdAt,
                updatedAt: response.data[0].updatedAt,
                nodeId: response.data[0].nodeId,
            });
        }
        dispatch(storeDiskInfo(diskDetailsList));
    } catch (err) {
        throw err;
    }
};

export const getBalanceInfo = (nodeId: number): AppThunk => async (dispatch, getState) => {
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
