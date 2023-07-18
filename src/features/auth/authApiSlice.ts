import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setLogin, setCredentials } from "./authSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentialsBody => ({
                url: 'api/v1/users/login',
                method: 'POST',
                body: { ...credentialsBody }
            })
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: 'api/v1/users/logout',
                method: 'GET',
            }),
            async onQueryStarted(arg: any, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    dispatch(logOut(""))
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        checkLogin: builder.mutation({
            query: () => ({
                url: 'api/v1/users/checkLogin',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    const jwt = data.data.cookie.jwt
                    const userId = data.data.userId
                    const loginStatus = data.data.loginStatus
                    if (!jwt) throw "no token found" 
                    if (!userId) throw "invalid userId" 
                    dispatch(setCredentials({ jwt, userId,  loginStatus}))
                } catch (err) {
                    console.error(`Error setting credentials in the checkLogin query: ${err}`)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useCheckLoginMutation,
} = authApiSlice 