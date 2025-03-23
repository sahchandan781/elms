import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"
import { userLoggedIn, userLoggedOut } from "../authSlice";

const USER_API = "http://localhost:8081/api/v1/users/"
export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery:fetchBaseQuery({
        baseUrl: USER_API,
        credentials:'include'
    }),
    endpoints: (builders) => ({
        registerUser: builders.mutation({
            query: (inputData) =>({
                url: "register",
                method:"POST",
                body:inputData
            })
        }),
        loginUser: builders.mutation({
            query: (inputData) =>({
                url: "login",
                method:"POST",
                body:inputData
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}){
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error);
                    
                }
            }
        }),
        logoutUser: builders.mutation({
            query: () => ({
                url:"logout",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    dispatch(userLoggedOut());
                } catch (error) {
                    console.log(error);
                }
            }
            
        }),
        loadUser: builders.query({
            query: () => ({
                url: "profile",
                method:"GET"
            }),
            async onQueryStarted(_, {queryFulfilled, dispatch}) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}));
                } catch (error) {
                    console.log(error);
                }
            }
        }),
        updateUser: builders.mutation({
            query:(formData) =>({
                url:"profile/update",
                method:"PUT",
                body:formData,
                credentials:"include"
            })
        }),
    })
})

export const {
    useRegisterUserMutation,
    useLoginUserMutation,
    useLoadUserQuery,
    useUpdateUserMutation,
    useLogoutUserMutation
} = authApi;