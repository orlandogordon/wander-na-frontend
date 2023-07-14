import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://wander-api-bl56.onrender.com', 
        credentials: 'include',  
        prepareHeaders: (headers) => {
        headers.set('Access-Control-Allow-Origin', 'https://wander-xggp.onrender.com/')
        return headers
    }}),
    tagTypes: ['Tour', 'User'],
    endpoints: builder => ({})
})