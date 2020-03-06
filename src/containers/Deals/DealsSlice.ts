import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {fetchPastDeals, fetchPastDealsCount} from "../../app/Api";
import {INodeDeal} from "../../@types/ReduxStates";

interface IDataEntity {
    data: any;
    isLoading: boolean;
    error: string;
    count: number;
}

const defaultEntityProperties = {
    isLoading: true,
    error: "",
};

const initialState: IDataEntity = {
    ...defaultEntityProperties,
    data: [],
    count: 0,
};

const dealsSlice = createSlice({
    name: "deals",
    initialState,
    reducers: {
        storeDealsCount(state: IDataEntity, action: PayloadAction<number>): void {
            state.count = action.payload;
        },
        storeDealsSuccess(state: IDataEntity, action: PayloadAction<Array<INodeDeal>>): void {
            state.data = action.payload;
            state.isLoading = false;
            state.error = "";
        },
        storeDealsError(state: IDataEntity, action: PayloadAction<string>): void {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

const {storeDealsSuccess, storeDealsError, storeDealsCount} = dealsSlice.actions;
export const dealsReducer = dealsSlice.reducer;

export const getDeals = (nodeId: number, from: number, to: number): AppThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    try {
        const token = getState().user.token;
        const [recordsCountResponse, dealsResponse] = await Promise.all([
            await fetchPastDealsCount(token, nodeId),
            await fetchPastDeals(token, nodeId, from, to),
        ]);
        dispatch(storeDealsCount(recordsCountResponse.data));
        dispatch(storeDealsSuccess(dealsResponse.data));
    } catch (err) {
        dispatch(storeDealsError(err.message));
    }
};
