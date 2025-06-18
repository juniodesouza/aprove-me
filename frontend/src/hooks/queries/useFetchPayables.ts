import { useQuery } from '@tanstack/react-query'
import { api } from '@/services/api.service'
import type { Payable } from '@/types/payable'

export const useFetchPayables = () => {
  return useQuery<Payable[]>({
    queryKey: ['payables'],
    queryFn: async () => {
      const response = await api.get<Payable[]>('payable')
      return response.data.map((item: Payable) => {
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
