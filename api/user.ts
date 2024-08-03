import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:1234/api/v1";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({
        baseUrl,
        credentials: "include",
        prepareHeaders(headers: Headers) {
            const accessToken = localStorage.getItem("accessToken");
            const refreshToken = localStorage.getItem("refreshToken");

            if (accessToken && refreshToken) {
                headers.set("accessToken", accessToken);
                headers.set("refreshToken", refreshToken);
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
        
    }),
});

export const {
    useLoginMutation,
    useSignupMutation
} = userApi;
