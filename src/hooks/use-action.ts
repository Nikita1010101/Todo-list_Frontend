import { bindActionCreators } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'

import { rootAction } from '@/store/root-action'

export const useAction = () => {
  const dispatch = useDispatch()
  return bindActionCreators(rootAction, dispatch)
}
