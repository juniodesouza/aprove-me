import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'

export const useFetchAssignors = () => {
   return useQuery({
      queryKey: ['assignors'],
      queryFn: async () => {
         const response = await api.get('assignor')
         return response.data.map((item: { id: string; name: string }) => ({
            value: item.id,
            label: item.name,
         }))
      },
   })
}
