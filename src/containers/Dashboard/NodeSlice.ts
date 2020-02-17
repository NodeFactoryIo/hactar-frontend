import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {getNodes, getMinerInfo} from "./DashboardApi";
import {INodeState, INodeInfoState} from "./NodeInterface";

interface IState {
    fetchComplete: boolean;
    nodeList: Array<INodeState>;
    nodeInfo: INodeInfoState | null;
}
const initialState: IState = {
    fetchComplete: false,
    nodeList: [],
    nodeInfo: null,
};

const nodeSlice = createSlice({
    name: "node",
    initialState,
    reducers: {
        loading(state: IState): void {
            state.fetchComplete = true;
        },
        storeNodeList(state: IState, action: PayloadAction<Array<INodeState>>): void {
            action.payload.map(node => state.nodeList.push(node));
        },
        storeNodeInfo(state: IState, action: PayloadAction<INodeInfoState>): void {
            state.nodeInfo = action.payload;
        },
    },
});

export const {loading, storeNodeList, storeNodeInfo} = nodeSlice.actions;
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
            dispatch(loading());
        }
    } catch (err) {
        throw err;
    }
};
