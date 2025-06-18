import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'
import type { Assignor } from '@/types/assignor'

export const useFetchAssignorsForPayable = () => {
   return useQuery<{ value: string; label: string }[]>({
      queryKey: ['assignors-payable'],
      queryFn: async () => {
         const response = await api.get<Assignor[]>('assignor')
         return response.data.map((item) => ({
            value: item.id,
            label: item.name,
         }))
      },
   })
}
