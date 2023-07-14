import { createSlice } from '@reduxjs/toolkit'

const authSlice: any = createSlice({
    name: 'auth',
    initialState: { token: null, loginStatus: false, userId: "", },
    reducers: {
        setCredentials: (state, action) => {
            const { jwt, userId, loginStatus } = action.payload
            state.token = jwt
            state.userId = userId
            state.loginStatus = loginStatus
        },
        logOut: (state, action) => {
            state.token = null
        },
        setLogin: (state, action) => {
            const {loginStatus, cookie} = action.payload;
            state.loginStatus = loginStatus;
        }
    }
})

export const { setCredentials, logOut, setLogin } = authSlice.actions

export default authSlice.reducer

export const selectCurrentToken = (state: any) => state.auth.token
export const selectCurrentUserId = (state: any) => state.auth.userId
export const selectLoginStatus = (state: any) => state.auth.loginStatus