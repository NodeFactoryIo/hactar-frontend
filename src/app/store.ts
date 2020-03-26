import {configureStore, Action, getDefaultMiddleware} from "@reduxjs/toolkit";
import {ThunkAction} from "redux-thunk";
import {logger} from "redux-logger";

import rootReducer, {RootState} from "./rootReducer";

const middleware = [...getDefaultMiddleware()];

if (process.env.NODE_ENV === "development") {
    middleware.push(logger);
}

const store = configureStore({
    reducer: rootReducer,
    middleware,
});

if (process.env.NODE_ENV === "development" && module.hot) {
    module.hot.accept("./rootReducer", () => {
        const newRootReducer = require("./rootReducer").default;
        store.replaceReducer(newRootReducer);
    });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;

export default store;
