import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {
    fetchMiningRewards,
} from "../../app/Api";
import {IMiningReward} from "../../@types/ReduxStates";

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

const miningRewardsSlice = createSlice({
    name: "miningRewards",
    initialState,
    reducers: {
        storeMiningRewardsSuccess(state: IDataEntity, action: PayloadAction<Array<IMiningReward>>): void {
            state.data = action.payload;
            state.isLoading = false;
            state.error = "";
        },
        storeMiningRewardsError(state: IDataEntity, action: PayloadAction<string>): void {
            state.error = action.payload;
        },
    },
});

export const {
    storeMiningRewardsSuccess,
    storeMiningRewardsError,
} = miningRewardsSlice.actions;

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

export default miningRewardsSlice.reducer;
