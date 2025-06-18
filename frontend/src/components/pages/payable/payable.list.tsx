import { Page } from '@/components/layout/page'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

export function PayableList() {
   const createNewRegister = (
      <Button className="px-4" asChild>
         <Link to={`/app/payables/create`}>
            <PlusIcon />
            Novo registro
         </Link>
      </Button>
   )

   return (
      <Page title="Pagáveis" actions={createNewRegister}>
         PayableList
      </Page>
   )
}
