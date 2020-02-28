import {createSlice, PayloadAction, combineReducers} from "@reduxjs/toolkit";

import {AppThunk} from "../../app/store";
import {
    getLatestNodeVersion,
} from "./DashboardApi";
import generalInfoReducer from '../GeneralInfo/GeneralInfoSlice';
import balanceReducer from '../Balance/BalanceSlice';
import miningRewardsReducer from '../MiningRewards/MiningRewardsSlice';
import diskSpaceReducer from '../DiskSpace/DiskSpaceSlice';

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
    data: null,
};

const latestNodeVersion = createSlice({
    name: "node",
    initialState,
    reducers: {
        resetNodeState: (): IDataEntity => initialState,
        storeLatestNodeVersion(state: IDataEntity, action: PayloadAction<string>): void {
            state.data = action.payload;
            state.isLoading = false;
            state.error = "";
        },
    },
});

export const {
    resetNodeState,
    storeLatestNodeVersion,
} = latestNodeVersion.actions;

export default combineReducers({
    information: generalInfoReducer,
    balance: balanceReducer,
    miningRewards: miningRewardsReducer,
    diskSpace: diskSpaceReducer,
    latestNodeVersion: latestNodeVersion.reducer,
});

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
