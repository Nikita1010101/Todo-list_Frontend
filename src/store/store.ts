import { configureStore } from '@reduxjs/toolkit'

import { rootReducer } from './root-reducer'

const store = configureStore({
  reducer: rootReducer,
})

export type TypeStoreState = ReturnType<typeof store.getState>
export default store
