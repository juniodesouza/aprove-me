import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'

export const useFetchPayables = () => {
  return useQuery({
    queryKey: ['payables'],
    queryFn: async () => {
      const response = await api.get('payable')
      return response.data.map((item: any) => {
        const [year, month, day] = item.emissionDate.split('T')[0].split('-')
        return {
          ...item,
          emissionDate: new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
          ),
        }
      })
    },
  })
}
