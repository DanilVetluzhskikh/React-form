import {
  createApi,
  fetchBaseQuery
} from '@reduxjs/toolkit/dist/query/react'
import { getCookie } from '@utils/cookie'

export type UserType = {
  email: string;
  name: string;
}

export type ErrorUpdateType = {
  status: number;
  data: {
    errorsUpdate: Array<{
      msg: string
    }>
  }
}

export const getUserDataService = createApi({
  reducerPath: 'userData',
  tagTypes: [ 'UserData' ],
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:1337/api/user',
    prepareHeaders: (headers, { getState }) => {
      const token = getCookie('token')
      const userId = getCookie('userId')

      if (token && userId) {
        headers.set('authorization', `Bearer ${token}`)
        headers.set('id', userId)
      }

      return headers
    }
  }),
  endpoints: (build) => ({
    fetchDataUser: build.query({
      query: () => ({ url: '/data' }),
      providesTags: () => [ 'UserData' ]
    }),
    updateData: build.mutation({
      query: (data) => ({
        url: '/update',
        method: 'POST',
        body: data
      }),
      invalidatesTags: [ 'UserData' ]
    })
  })
})
