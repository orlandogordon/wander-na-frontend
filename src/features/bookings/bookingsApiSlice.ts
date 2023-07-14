import {
    createSelector,
    createEntityAdapter
} from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";
import { TourObj } from "../../shared/types";


const bookingsAdapter = createEntityAdapter({
    sortComparer: (a: any, b: any) => (a.completed === b.completed) ? 0 : a.completed ? 1 : -1
})

const initialState = bookingsAdapter.getInitialState()

export const bookingsApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getBookings: builder.query<any,void>({
            query: () => ({url: '/api/v1/bookings',
            validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 10,
            transformResponse: (responseData: any) => {
                const loadedBookings = responseData.map((user: any) => {
                    user.id = user._id as string
                    return user
                });
                return bookingsAdapter.setAll(initialState, loadedBookings)
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
        getCheckoutSession: builder.query<any, {tourId: string, startDate: any}>({
            query: ({tourId, startDate}) => ({url: `/api/v1/bookings/checkout-session/${tourId}/${startDate}`,
            validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 10,
           
        })
        }),
        getCreateBooking: builder.query<any,{tour: string, user: any, price: any, startDate: any}>({
            query: ({tour, user, price, startDate}) => ({url: `/api/v1/bookings/my-tours/?tour=${tour}&user=${user}&price=${price}&startDate=${startDate}`,
            validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 10,
        })
        }),
        getMyBookings: builder.query<any,void>({
            query: () => ({url: `/api/v1/bookings/my-tours`,
            validateStatus: (response: any, result: any) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 10,
        })
        }),
    }),
})



export const {
    useGetBookingsQuery,
    useLazyGetCheckoutSessionQuery,
    useGetCreateBookingQuery,
    useGetMyBookingsQuery,
} = bookingsApiSlice

// returns the query result object
export const selectBookingsResult = bookingsApiSlice.endpoints.getBookings.select()


// creates memoized selector
const selectBookingsData = createSelector(
    selectBookingsResult,
    BookingsResult => BookingsResult.data // normalized state object with ids & entities
    )
    

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
    selectAll: selectAllBookings,
    // Pass in a selector that returns the bookings slice of state
} = bookingsAdapter.getSelectors((state: any) => selectBookingsData(state) ?? initialState)