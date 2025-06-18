import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'

export const useFetchPayable = (id: string) => {
   return useQuery({
      queryKey: ['payable', id],
      queryFn: async () => {
         const response = await api.get(`payable/${id}`)
         const data = response.data
         const [year, month, day] = data.emissionDate.split('T')[0].split('-')
         return {
            ...data,
            emissionDate: new Date(
               Number(year),
               Number(month) - 1,
               Number(day)
            ),
         }
      },
      enabled: !!id,
   })
}
