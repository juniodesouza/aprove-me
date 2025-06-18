import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'

export const useFetchUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await api.get('user')
      return response.data
    },
  })
}
