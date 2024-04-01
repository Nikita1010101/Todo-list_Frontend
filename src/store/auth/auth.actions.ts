import { AuthService } from '@/services/auth.service'
import { IUser } from '@/types/user.type'
import { createAsyncThunk } from '@reduxjs/toolkit'

export const login = createAsyncThunk(
  'auth/login',
  async (body: Pick<IUser, 'email' | 'password'>, thunkApi) => {
    try {
      const { data } = await AuthService.login(body)
      return data
    } catch (error) {
      throw thunkApi.rejectWithValue(error)
    }
  }
)