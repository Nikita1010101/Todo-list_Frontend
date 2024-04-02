import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { TypeStoreState } from '@/store/store'

export const useTypedSelector: TypedUseSelectorHook<TypeStoreState> = useSelector
