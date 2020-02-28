import {createSlice, combineReducers, PayloadAction} from "@reduxjs/toolkit";

import generalInfoReducer from "../GeneralInfo/GeneralInfoSlice";
import balanceReducer from "../Balance/BalanceSlice";
import miningRewardsReducer from "../MiningRewards/MiningRewardsSlice";
import diskSpaceReducer from "../DiskSpace/DiskSpaceSlice";

interface IState {
    selectedNodeId: null | number;
}

const initialState: IState = {
    selectedNodeId: null,
};

const selectedNodeSlice = createSlice({
    name: "selected",
    initialState,
    reducers: {
        resetNodeState: (): IState => initialState,
        storeSelectedNode(state: IState, action: PayloadAction<number>): void {
            state.selectedNodeId = action.payload;
        },
    },
});

export const {resetNodeState, storeSelectedNode} = selectedNodeSlice.actions;

export default combineReducers({
    information: generalInfoReducer,
    balance: balanceReducer,
    miningRewards: miningRewardsReducer,
    diskSpace: diskSpaceReducer,
    selected: selectedNodeSlice.reducer,
});
