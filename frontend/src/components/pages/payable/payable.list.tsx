import { Link, useNavigate } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import { Page } from '@/components/layout/page'
import { Button } from '@/components/ui/button'
import { useFetchPayables } from '@/hooks/queries/useFetchPayables'
import { useFetchAssignors } from '@/hooks/queries/useFetchAssignors'
import { PayableTable } from './payable-table'
import { Payable } from '@/types/payable'

export function PayableList() {
   const navigate = useNavigate()

   const { data: payables, isLoading: loadingPayables } = useFetchPayables()
   const { data: assignors, isLoading: loadingAssignors } = useFetchAssignors()

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

   const handleDelete = (payable: Payable) => {
      console.log(`Deleting payable with id: ${payable.id}`)
   }

   return (
      <Page title="Pagáveis" actions={createNewRegister}>
         <PayableTable
            onEdit={handleEdit}
            onDelete={handleDelete}
            payables={payables}
            assignors={assignors}
         />
      </Page>
   )
}
