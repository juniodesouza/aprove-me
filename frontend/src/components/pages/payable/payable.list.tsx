import { Link, useNavigate } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import { Page } from '@/components/layout/page'
import { Button } from '@/components/ui/button'
import { useFetchPayables } from '@/hooks/queries/useFetchPayables'
import { PayableTable } from './payable-table'
import { Payable } from '@/types/payable'
import DeleteAlertDialog from '@/components/custom/alert-delete'
import { useState } from 'react'
import { useDeletePayable } from '@/hooks/mutations/useDeletePayable'
import { handleApiError } from '@/helpers/api-error-handler'
import { toast } from '@/hooks/use-toast'
import PayableView from './payable-view'

export function PayableList() {
   const navigate = useNavigate()

   const [openAlert, setOpenAlert] = useState<boolean>(false)
   const [openView, setOpenView] = useState<boolean>(false)

   const [id, setId] = useState<string>('')
   const [payable, setPayable] = useState<Payable | null>(null)

   const { data: payables, isLoading: loadingPayables } = useFetchPayables()
   const deleteMutation = useDeletePayable()

   if (loadingPayables) {
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

   const handleView = (payable: Payable) => {
      setPayable(payable)
      setOpenView(true)
   }

   return (
      <Page title="Pagáveis" actions={createNewRegister}>
         <PayableTable
            onEdit={handleEdit}
            onDelete={handleConfirmDelete}
            onView={handleView}
            payables={payables}
         />
         <DeleteAlertDialog
            open={openAlert}
            onOpenChange={setOpenAlert}
            onConfirm={handleDelete}
         />

         {payable && (
            <PayableView
               open={openView}
               onOpenChange={setOpenView}
               payable={payable}
            />
         )}
      </Page>
   )
}
