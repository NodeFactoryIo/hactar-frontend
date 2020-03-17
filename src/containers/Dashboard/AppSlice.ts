import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface IState {
    selectedNodeId: null | number;
}

const initialState: IState = {
    selectedNodeId: null,
};

const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        resetAppState: (): IState => initialState,
        storeSelectedNode(state: IState, action: PayloadAction<number>): void {
            localStorage.setItem("selectedNode", JSON.stringify(action.payload));
            state.selectedNodeId = action.payload;
        },
    },
});

export const {resetAppState, storeSelectedNode} = appSlice.actions;

export const appReducer = appSlice.reducer;
