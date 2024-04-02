import { createSlice } from '@reduxjs/toolkit'

import { IAuthInitialState } from './auth.interface'
import { login, logout } from './auth.actions'

export const authInitialState: IAuthInitialState = {
  user: null,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    updateUser: (state, { payload }) => {
      state.user = payload
    },
  },
  extraReducers: builder =>
    builder
      .addCase(login.fulfilled, (state, { payload }) => {
        if (payload) {
          state.user = payload.user
        }
      })
      .addCase(login.rejected, state => {
        state.user = null
      })
      .addCase(login.pending, state => {
        state.user = null
      })
      .addCase(logout.fulfilled, state => {
        state.user = null
      })
      .addCase(logout.rejected, state => {
        state.user = null
      })
      .addCase(logout.pending, state => {
        state.user = null
      }),
})

export const authActions = authSlice.actions
