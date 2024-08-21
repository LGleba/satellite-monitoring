import {configureStore} from "@reduxjs/toolkit";
import {storeSlice} from "./storeSlice";



export const store = configureStore({
    reducer: {
        values: storeSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch