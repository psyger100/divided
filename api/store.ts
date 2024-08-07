import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./user";
import { setupListeners } from "@reduxjs/toolkit/query";
import userInformationReducer from "./userSlice";
import * as Keychain from "react-native-keychain";

const abc = (store: any) => (next: any) => (action: any) => {
    console.log("\n\n\n ", action.payload, "\n\n\n\n");

    const setCreads = async (name: string, value: string) => {
        await Keychain.setGenericPassword(name, value);
    };
    const removeCreds = async () => {
        await Keychain.resetGenericPassword();
    };
    if (action?.payload?.setAccessToken) {
        setCreads("accessToken", action.payload.accessToken);
    }
    if (action?.payload?.setRefreshToken) {
        setCreads("refreshToken", action.payload.refreshToken);
    }
    if (action?.payload?.logout) {
        removeCreds();
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
