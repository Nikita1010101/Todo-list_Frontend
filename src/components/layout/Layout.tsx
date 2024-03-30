'use client'

import React, { FC, PropsWithChildren } from 'react'
import { Provider } from 'react-redux'

import store from '@/store/store'

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={store}>
      <main>{children}</main>
    </Provider>
  )
}
