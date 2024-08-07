import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as Keychain from "react-native-keychain";
// const baseUrl = "http://localhost:1234/api/v1";
const baseUrl =
    "https://a5fb-2409-40d1-1029-72d9-8b5c-11a1-fd5e-c70a.ngrok-free.app/api/v1";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include",
        async prepareHeaders(headers: Headers) {
            try {
                const credentials: any = await Keychain.getGenericPassword();
                if (credentials) {
                    console.log(credentials);
                    headers.set("accessToken", credentials.accessToken);
                    headers.set("refreshToken", credentials.refreshToken);
                }
            } catch (error: any) {
                console.log(error.message);
            }
        },
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials: any) => ({
                url: "/user/login",
                method: "POST",
                body: { ...credentials },
            }),
        }),
        signup: builder.mutation({
            query: (Credentials) => ({
                url: "/user/signup",
                method: "POST",
                body: { ...Credentials },
            }),
        }),
        currentUser: builder.query({
            query: () => ({
                url: "/user/currentUser",
                method: "GET",
            }),
        }),
    }),
});

export const { useLoginMutation, useSignupMutation, useCurrentUserQuery } = userApi;
