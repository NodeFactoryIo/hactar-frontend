import {createSlice, combineReducers} from "@reduxjs/toolkit";

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

const nodeSlice = createSlice({
    name: "node",
    initialState,
    reducers: {
        resetNodeState: (): IDataEntity => initialState,
    },
});

export const {
    resetNodeState,
} = nodeSlice.actions;

export default combineReducers({
    information: generalInfoReducer,
    balance: balanceReducer,
    miningRewards: miningRewardsReducer,
    diskSpace: diskSpaceReducer,
});


