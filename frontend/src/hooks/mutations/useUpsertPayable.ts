import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api.service'
import { FormPayableValues } from '@/components/pages/payable/payable-form'

export const useUpsertPayable = (id?: string) => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (data: FormPayableValues) => {
         if (id) {
            return api.patch(`payable/${id}`, data)
         }
         return api.post('payable', data)
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['payables'] })
         if (id) {
            queryClient.invalidateQueries({ queryKey: ['payable', id] })
         }
      },
   })
}
