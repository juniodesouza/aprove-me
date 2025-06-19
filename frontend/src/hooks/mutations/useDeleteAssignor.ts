import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/services/api.service'

export const useDeleteAssignor = () => {
   const queryClient = useQueryClient()

   return useMutation({
      mutationFn: async (id: string) => {
         return api.delete(`assignor/${id}`)
      },
      onSuccess: (_, id) => {
         queryClient.invalidateQueries({ queryKey: ['assignors'] })
         queryClient.removeQueries({ queryKey: ['assignor', id] })
      },
   })
}
