import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {getNodes, getMinerInfo, getDiskDetails} from "./DashboardApi";
import {INodeState, INodeInfoState, INodeDiskState} from "./NodeInterface";

interface IState {
    nodeListComplete: boolean;
    nodeList: Array<INodeState>;
    nodeInfo: INodeInfoState | null;
    nodeDiskInfo: Array<INodeDiskState>;
}
const initialState: IState = {
    nodeListComplete: false,
    nodeList: [],
    nodeInfo: null,
    nodeDiskInfo: [],
};

const nodeSlice = createSlice({
    name: "node",
    initialState,
    reducers: {
        nodeListComplete(state: IState): void {
            state.nodeListComplete = true;
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
    },
});

export const {nodeListComplete, storeNodeList, storeNodeInfo, storeDiskInfo} = nodeSlice.actions;
export default nodeSlice.reducer;

export const getNodeList = (auth: string | null): AppThunk => async dispatch => {
    try {
        const nodeListResponse = await getNodes(auth);
        dispatch(storeNodeList(nodeListResponse.data));

        if (nodeListResponse.data[0] && nodeListResponse.data[0].id) {
            const nodeInfoResponse = await getMinerInfo(auth, nodeListResponse.data[0].id);
            dispatch(
                storeNodeInfo({
                    version: nodeInfoResponse.data.version,
                    sectorSize: nodeInfoResponse.data.sectorSize,
                    minerPower: nodeInfoResponse.data.minerPower,
                    totalPower: nodeInfoResponse.data.totalPower,
                }),
            );

            const diskDetailsList: Array<INodeDiskState> = [];
            const nodeList = nodeListResponse.data;

            for (let index = 0; index < nodeList.length; index++) {
                const response: any = await getDiskDetails(auth, nodeList[index].id);
                diskDetailsList.push({
                    id: response.data[0].id,
                    freeSpace: response.data[0].freeSpace,
                    takenSpace: response.data[0].takenSpace,
                    nodeId: response.data[0].nodeId,
                });
            }

            dispatch(storeDiskInfo(diskDetailsList));
            dispatch(nodeListComplete());
        }
    } catch (err) {
        throw err;
    }
};
