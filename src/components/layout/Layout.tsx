'use client'

import React, { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import store from '@/store/store'
import { interactWithLocalStorage } from '@/utils/interact-with-local-storage'
import { ACCESS_TOKEN } from '@/constants/token.constant'

const client = new QueryClient()

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  interactWithLocalStorage(ACCESS_TOKEN, '')

  return (
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <main>{children}</main>
      </QueryClientProvider>
    </Provider>
  )
}
