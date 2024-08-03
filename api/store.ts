import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./user";
import { setupListeners } from "@reduxjs/toolkit/query";
import userInformationReducer from "./userSlice";

const abc = (store: any) => (next: any) => (action: any) => {
    if (action?.payload?.setAccessToken) {
        localStorage.setItem("accessToken", action.payload.setAccessToken);
    }
    if (action?.payload?.setRefreshToken) {
        localStorage.setItem("refreshToken", action.payload.setRefreshToken);
    }
    if (action?.payload?.logout) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }

    next(action);
};
export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
        userInformation: userInformationReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([userApi.middleware, abc]),

    devTools: true,
});

setupListeners(store.dispatch);
// (getDefaultMiddleware) =>getDefaultMiddleware().concat(userApi.middleware),
