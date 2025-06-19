import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'
import type { User } from '@/types/user'

export const useFetchUser = (id: string) => {
   return useQuery<User | undefined>({
      queryKey: ['user', id],
      queryFn: async () => {
         const response = await api.get<User>(`user/${id}`)
         return response.data
      },
      enabled: !!id,
   })
}
