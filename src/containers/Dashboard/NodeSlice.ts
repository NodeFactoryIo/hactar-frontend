import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AppThunk} from "../../app/store";
import {getNodes} from "./DashboardApi";

interface INodeState {
    id: number;
    url: string;
    token: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
}

const initialState: Array<INodeState> = []

const nodeSlice = createSlice({
    name: "node",
    initialState,
    reducers: {
        storeNodes(state: Array<INodeState>, action: PayloadAction<Array<INodeState>>) {
            action.payload.map((node) => state.concat(node));
        }
    }
});

export const {storeNodes} = nodeSlice.actions;
export default nodeSlice.reducer;

export const getNodeList = (auth: string | null): AppThunk => async dispatch => {
    try{
        const response = await getNodes(auth);
        console.log(response);
        console.log(response.data);
        dispatch(storeNodes(response.data));
    }
    catch(err){
        throw(err)
    }
}