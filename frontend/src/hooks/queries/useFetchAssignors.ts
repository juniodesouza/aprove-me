import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'
import type { Assignor } from '@/types/assignor'

export const useFetchAssignors = () => {
  return useQuery<Assignor[]>({
    queryKey: ['assignors'],
    queryFn: async () => {
      const response = await api.get<Assignor[]>('assignor')
      return response.data
    },
  })
}
