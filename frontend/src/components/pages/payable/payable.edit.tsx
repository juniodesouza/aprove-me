import { useNavigate, useParams } from 'react-router-dom'
import { Page } from '@/components/layout/page'
import { toast } from '@/hooks/use-toast'
import { handleApiError } from '@/helpers/api-error-handler'
import { FormPayableValues, PayableForm } from './payable-form'
import { useFetchAssignors } from '@/hooks/api/useFetchAssignors'
import { useFetchPayable } from '@/hooks/api/useFetchPayable'
import { useUpsertPayable } from '@/hooks/api/useUpsertPayable'

export function PayableEdit() {
   const navigate = useNavigate()
   const { id } = useParams()

   const { data: assignors, isLoading: loadingAssignors } = useFetchAssignors()
   const { data: payable, isLoading: loadingPayable } = useFetchPayable(id!)
   const upsertMutation = useUpsertPayable(id)

   const isLoading = upsertMutation.isPending

   const handleSubmit = async (data: FormPayableValues) => {
      try {
         await upsertMutation.mutateAsync(data)
         toast({
            description: id
               ? 'Alterações salvas com sucesso!'
               : 'Cadastro realizado com sucesso!',
            variant: 'success',
         })
         navigate('/app/payables')
      } catch (error) {
         handleApiError(error)
      }
   }

   const handleCancel = () => {
      navigate('/app/payables')
   }

   if (loadingAssignors || (id && loadingPayable)) {
      return <div>Carregando...</div>
   }

   return (
      <Page title="Pagáveis">
         <PayableForm
            initialData={payable}
            assignors={assignors ?? []}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            onCancel={handleCancel}
         />
      </Page>
   )
}
