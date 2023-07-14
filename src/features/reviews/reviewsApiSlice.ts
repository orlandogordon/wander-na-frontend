import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { reactHooksModule } from "@reduxjs/toolkit/dist/query/react";


const reviewsAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = reviewsAdapter.getInitialState()

export const reviewsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getReviews: builder.query<any,string>({
            query: (id: string) => ({url: `/api/v1/tours/${id}/reviews`,
            validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 10,
            providesTags: (result: any, error:any, arg: any) => {
                if (result?.ids) {
                    return [
                        { type: 'Tour', id: 'LIST' },
                        ...result.ids.map((id: any) => ({ type: 'Tour' as const, id }))
                    ]
                } else return [{ type: 'Tour', id: 'LIST' }]
            }
        })
        }),
        createReview: builder.mutation({
            query: (reviewData) => ({
            url: `/api/v1/reviews`,
            method: 'POST',
            body: {...reviewData},
        })
        }),
        updateReview: builder.mutation({
            query: (reviewData) => ({
            url: `/api/v1/reviews/${reviewData.reviewId}`,
            method: 'PATCH',
            body: {...reviewData},
        })
        }),
        deleteReview: builder.mutation({
            query: (id: string) => ({
            url: `/api/v1/reviews/${id}`,
            method: 'DELETE',
        })
        }),
    }),
})

export const {
    useGetReviewsQuery,
    useCreateReviewMutation,
    useUpdateReviewMutation,
    useDeleteReviewMutation,
} = reviewsApiSlice


