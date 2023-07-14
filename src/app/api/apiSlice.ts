import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({baseUrl: 'https://wandar-na-api.onrender.com', credentials: 'include'}),
    tagTypes: ['Tour', 'User'],
    endpoints: builder => ({})
})