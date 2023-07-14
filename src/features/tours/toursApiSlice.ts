import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { TourObj } from "../../shared/types";
import { reactHooksModule } from "@reduxjs/toolkit/dist/query/react";


const toursAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = toursAdapter.getInitialState()

export const toursApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getTours: builder.query<any,any>({
            query: (searchParams: string) => ({url: `/api/v1/tours?${searchParams}`,
            validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 10,
            transformResponse: (responseData: any) => {
                const loadedTours = responseData.map((tour: any) => {
                    tour.id = tour._id as string
                    return tour
                });
                return toursAdapter.setAll(initialState, loadedTours)
            },
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
        getTour: builder.query<any,string>({
            query: (id: string) => ({url: `/api/v1/tours/${id}`,
            validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 10,
            transformResponse: (responseData: any) => {
                const loadedTour = {
                    ...responseData,
                    id: responseData._id,
                };
                return toursAdapter.setAll(initialState, loadedTour)
            },
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
    }),
})



export const {
    useGetToursQuery,
    useGetTourQuery,
    useGetReviewsQuery,
} = toursApiSlice

// returns the query result object
export const selectToursResult = toursApiSlice.endpoints.getTours.select("")


// creates memoized selector
const selectToursData = createSelector(
    selectToursResult,
    ToursResult => ToursResult.data // normalized state object with ids & entities
    )
    

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllTours,
    selectById: selectTourById,
    selectIds: selectTourIds
    // Pass in a selector that returns the tours slice of state
} = toursAdapter.getSelectors((state: any) => selectToursData(state) ?? initialState)