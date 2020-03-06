import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {fetchPastDeals} from "../../app/Api";
import {INodeDeal} from "../../@types/ReduxStates";

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
    data: [],
};

const dealsSlice = createSlice({
    name: "deals",
    initialState,
    reducers: {
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

const {storeDealsSuccess, storeDealsError} = dealsSlice.actions;
export const dealsReducer = dealsSlice.reducer;

export const getDeals = (nodeId: number, from: number, to: number): AppThunk => async (
    dispatch,
    getState,
): Promise<void> => {
    try {
        const token = getState().user.token;
        const response = await fetchPastDeals(token, nodeId, from, to);
        dispatch(storeDealsSuccess(response.data));
    } catch (err) {
        dispatch(storeDealsError(err.message));
    }
};
