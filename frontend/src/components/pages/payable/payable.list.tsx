import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'
import { Page } from '@/components/layout/page'
import { Button } from '@/components/ui/button'
import { useFetchPayables } from '@/hooks/queries/useFetchPayables'
import { useFetchAssignors } from '@/hooks/queries/useFetchAssignors'
import { PayableTable } from './payable-table'

export function PayableList() {
   const { data: payables, isLoading: loadingPayables } = useFetchPayables()
   const { data: assignors, isLoading: loadingAssignors } = useFetchAssignors()
   const createNewRegister = (
      <Button className="px-4" asChild>
         <Link to={`/app/payables/create`}>
            <PlusIcon />
            Novo registro
         </Link>
      </Button>
   )

   if (loadingPayables || loadingAssignors) {
      return <div>Carregando...</div>
   }

   return (
      <Page title="Pagáveis" actions={createNewRegister}>
         <PayableTable payables={payables} assignors={assignors} />
      </Page>
   )
}
