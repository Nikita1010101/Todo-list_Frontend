import { useMutation } from '@tanstack/react-query'

import { AuthService } from '@/services/auth.service'
import { IRegister } from '@/types/auth.types'

export const useCreateUser = () => {
  const { mutateAsync } = useMutation({
    mutationFn: (user: IRegister) => AuthService.register(user),
  })

  return { create: mutateAsync }
}
