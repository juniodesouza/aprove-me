import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api.service'

export const useDeletePayable = () => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (id: string) => {
         return api.delete(`payable/${id}`)
      },
      onSuccess: (_, id) => {
         queryClient.invalidateQueries({ queryKey: ['payables'] })
         queryClient.removeQueries({ queryKey: ['payable', id] })
      },
   })
}
