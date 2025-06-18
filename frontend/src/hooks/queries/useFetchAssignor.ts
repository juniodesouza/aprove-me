import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'

export const useFetchAssignor = (id: string) => {
  return useQuery({
    queryKey: ['assignor', id],
    queryFn: async () => {
      const response = await api.get(`assignor/${id}`)
      return response.data
    },
    enabled: !!id,
  })
}
