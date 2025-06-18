import { useNavigate, useParams } from 'react-router-dom'
import { Page } from '@/components/layout/page'
import { toast } from '@/hooks/use-toast'
import { handleApiError } from '@/helpers/api-error-handler'
import { FormPayableValues, PayableForm } from './payable-form'
import { useFetchPayable } from '@/hooks/queries/useFetchPayable'
import { useUpsertPayable } from '@/hooks/mutations/useUpsertPayable'
import { useFetchAssignorsForPayable } from '@/hooks/queries/useFetchAssignorsForPayable'

export function PayableEdit() {
   const navigate = useNavigate()
   const { id } = useParams()

   const { data: assignors, isLoading: loadingAssignors } =
      useFetchAssignorsForPayable()
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
