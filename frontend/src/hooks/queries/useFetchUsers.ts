import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'
import type { User } from '@/types/user'

export const useFetchUsers = () => {
   return useQuery<User[]>({
      queryKey: ['users'],
      queryFn: async () => {
         const response = await api.get<User[]>('user')
         return response.data
      },
   })
}
