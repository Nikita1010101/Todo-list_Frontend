import { useQuery } from '@tanstack/react-query'

import { UserService } from '@/services/user.service'

export const useGetSubordinates = (userId?: number) => {
  const { data } = useQuery({
    queryKey: ['subordinates'],
    queryFn: () => UserService.getAllSubordinates(userId),
    select: ({ data }) => data,
    enabled: !!userId
  })

  return { data }
}
