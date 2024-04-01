import { useQuery } from '@tanstack/react-query'

import { UserService } from '@/services/user.service'
import { useTypedSelector } from './use-typed-selector'

export const useGetSubordinates = () => {
  const { user } = useTypedSelector(state => state.auth)
  console.log('🚀 ~ useGetSubordinates ~ userId:', user?.id)

  const { data } = useQuery({
    queryKey: ['subordinates'],
    queryFn: () => UserService.getAllSubordinates(user?.id),
    select: ({ data }) => data,
  })

  return { data }
}
