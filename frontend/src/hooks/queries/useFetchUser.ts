import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'

export const useFetchUser = (id: string) => {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await api.get(`user/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}
