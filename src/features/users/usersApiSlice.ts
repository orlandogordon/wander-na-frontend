import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { UserObject } from "../../shared/types";


const usersAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = usersAdapter.getInitialState()

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query<any,string>({
            query: (params: string) => ({url: `/api/v1/users?${params}`,
            validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 10,
            transformResponse: (responseData: any) => {
                const loadedUsers = responseData.map((user: any) => {
                    user.id = user._id as string
                    return user
                });
                return usersAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result: any, error:any, arg: any) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id: any) => ({ type: 'User' as const, id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        })
        }),
        getUser: builder.query<any,string>({
            query: (id: string) => ({url: `/api/v1/users/${id}`,
            validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 10,
            transformResponse: (responseData: any) => {
                const loadedUser = {
                    ...responseData,
                    id: responseData._id,
                };
                return usersAdapter.setAll(initialState, loadedUser)
            },
            providesTags: (result: any, error:any, arg: any) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id: any) => ({ type: 'User' as const, id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        })
        }),
        addNewUser: builder.mutation<any,any>({
            query: initialUserData => ({
                url: '/api/v1/users/signup',
                method: 'POST',
                body: {
                    ...initialUserData,
                }
            }),
            invalidatesTags: [
                { type: 'User', id: "LIST" }
            ]
        }),
        updateUser: builder.mutation({
            query: userData => ({
                url: `/api/v1/users/updateMe`,
                method: 'PATCH',
                body: userData,
                formData: true,
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        updatePassword: builder.mutation({
            query: initialUserData => ({
                url: `/api/v1/users/updateMyPassword`,
                method: 'PATCH',
                body: {
                    ...initialUserData,
                },
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ]
        }),
        getCurrentUser: builder.query({
            query: () => ({url: `/api/v1/users/me`,
            validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 10,
            providesTags: (result: any, error:any, arg: any) => {
                if (result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map((id: any) => ({ type: 'User' as const, id }))
                    ]
                } else return [{ type: 'User', id: 'LIST' }]
            }
        })
        }),
        deleteUser: builder.mutation({
            query: ({ id }) => ({
                url: `/users`,
                method: 'DELETE',
                body: { id }
            }),
            invalidatesTags: (result, error, arg) => [
                { type: 'User', id: arg.id }
            ],
            transformErrorResponse: (
                response: any,
                meta,
                arg
              ) => response.status,
        }),
    }),
})



export const {
    useGetUsersQuery,
    useGetUserQuery,
    useGetCurrentUserQuery,
    useAddNewUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
    useUpdatePasswordMutation,
} = usersApiSlice

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select("")


// creates memoized selector
const selectUsersData = createSelector(
    selectUsersResult,
    UsersResult => UsersResult.data // normalized state object with ids & entities
    )
    

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors((state: any) => selectUsersData(state) ?? initialState)