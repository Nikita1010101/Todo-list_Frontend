import { TypeStoreState } from '@/store/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useTypedSelector: TypedUseSelectorHook<TypeStoreState> = useSelector
