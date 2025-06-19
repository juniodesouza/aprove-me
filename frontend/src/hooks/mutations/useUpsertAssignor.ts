import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api.service'
import { FormAssignorValues } from '@/components/pages/assignor/assignor-form'

export const useUpsertAssignor = (id?: string) => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (data: FormAssignorValues) => {
         if (id) {
            return api.patch(`assignor/${id}`, data)
         }
         return api.post('assignor', data)
      },
      onSuccess: () => {
         queryClient.invalidateQueries({ queryKey: ['assignors'] })
         if (id) {
            queryClient.invalidateQueries({ queryKey: ['assignor', id] })
         }
      },
   })
}
