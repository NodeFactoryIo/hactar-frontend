import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {
    getBalance,
} from "../Dashboard/DashboardApi";
import {INodeBalance} from "../Dashboard/NodeInterface";

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

const balanceSlice = createSlice({
    name: "balance",
    initialState,
    reducers: {
        storeBalanceInfo(state: IDataEntity, action: PayloadAction<INodeBalance>): void {
            state.data = action.payload;
            state.isLoading = false;
            state.error = "";
        },
    },
});

export const {
    storeBalanceInfo,
} = balanceSlice.actions;

export const getBalanceInfo = (nodeId: number): AppThunk => async (dispatch, getState): Promise<void> => {
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

export default balanceSlice.reducer;
