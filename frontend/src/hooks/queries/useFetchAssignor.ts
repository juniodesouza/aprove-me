import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'
import type { Assignor } from '@/types/assignor'

export const useFetchAssignor = (id: string) => {
   return useQuery<Assignor | undefined>({
      queryKey: ['assignor', id],
      queryFn: async () => {
         const response = await api.get<Assignor>(`assignor/${id}`)
         return response.data
      },
      enabled: !!id,
   })
}
