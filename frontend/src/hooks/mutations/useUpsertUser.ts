import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api.service'

export type FormUserValues = {
  login: string
  password: string
}

export const useUpsertUser = (id?: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: FormUserValues) => {
      if (id) {
        return api.patch(`user/${id}`, data)
      }
      return api.post('user', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
    },
  })
}
