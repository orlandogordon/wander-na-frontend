import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'https://wander-api-bl56.onrender.com', credentials: 'include'}),
    tagTypes: ['Tour', 'User'],
    endpoints: builder => ({})
})