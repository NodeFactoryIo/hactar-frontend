import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import _ from "lodash";

import {AppThunk} from "../../app/store";
import {fetchUptime} from "../../app/Api";
import {INodeUptime} from "../../@types/ReduxStates";

interface IDataEntity {
    data: Array<INodeUptime>;
    isLoading: boolean;
    error: string;
}

const defaultEntityProperties = {
    isLoading: true,
    error: "",
};

const initialState: IDataEntity = {
    ...defaultEntityProperties,
    data: [],
};

const uptimeSlice = createSlice({
    name: "uptime",
    initialState,
    reducers: {
        storeUptimeSuccess(state: IDataEntity, action: PayloadAction<Array<INodeUptime>>): void {
            state.data = _.sortBy(action.payload, ["updatedAt"]);
            state.isLoading = false;
            state.error = "";
        },
        storeUptimeError(state: IDataEntity, action: PayloadAction<string>): void {
            state.error = action.payload;
        },
    },
});

export const {storeUptimeSuccess, storeUptimeError} = uptimeSlice.actions;

export const getUptime = (nodeId: number, interval = "Week"): AppThunk => async (dispatch, getState): Promise<void> => {
    try {
        const token = getState().user.token;
        const response = await fetchUptime(token, nodeId, interval);
        if (response.data) {
            dispatch(storeUptimeSuccess(response.data));
        }
    } catch (err) {
        dispatch(storeUptimeError(err.message));
    }
};

export const uptimeReducer = uptimeSlice.reducer;
