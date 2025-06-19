import { Link, useNavigate } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import { Page } from '@/components/layout/page'
import { Button } from '@/components/ui/button'
import { useFetchPayables } from '@/hooks/queries/useFetchPayables'
import { useFetchAssignors } from '@/hooks/queries/useFetchAssignors'
import { PayableTable } from './payable-table'
import { Payable } from '@/types/payable'
import DeleteAlertDialog from '@/components/custom/alert-delete'
import { useState } from 'react'
import { useDeletePayable } from '@/hooks/mutations/useDeletePayable'
import { handleApiError } from '@/helpers/api-error-handler'
import { toast } from '@/hooks/use-toast'

export function PayableList() {
   const navigate = useNavigate()

   const [openAlert, setOpenAlert] = useState<boolean>(false)
   const [id, setId] = useState<string>('')

   const { data: payables, isLoading: loadingPayables } = useFetchPayables()
   const { data: assignors, isLoading: loadingAssignors } = useFetchAssignors()
   const deleteMutation = useDeletePayable()

   if (loadingPayables || loadingAssignors) {
      return <div>Carregando...</div>
   }

   const createNewRegister = (
      <Button className="px-4" asChild>
         <Link to={`/app/payables/create`}>
            <PlusIcon />
            Novo registro
         </Link>
      </Button>
   )

   const handleEdit = (payable: Payable) => {
      navigate(`/app/payables/${payable.id}/edit`)
   }

   const handleConfirmDelete = (payable: Payable) => {
      setId(payable.id)
      setOpenAlert(true)
   }

   const handleDelete = async () => {
      if (!id) return

      try {
         await deleteMutation.mutateAsync(id)

         setId('')
         setOpenAlert(false)

         toast({
            description: 'Registro excluído com sucesso',
            variant: 'success',
         })
      } catch (error) {
         handleApiError(error)
      }
   }

   return (
      <Page title="Pagáveis" actions={createNewRegister}>
         <PayableTable
            onEdit={handleEdit}
            onDelete={handleConfirmDelete}
            payables={payables}
            assignors={assignors}
         />
         <DeleteAlertDialog
            open={openAlert}
            onOpenChange={setOpenAlert}
            onConfirm={handleDelete}
         />
      </Page>
   )
}
