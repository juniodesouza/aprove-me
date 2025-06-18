import { Link } from 'react-router-dom'
import { Pencil, PlusIcon, Trash2 } from 'lucide-react'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'
import { Page } from '@/components/layout/page'
import { Button } from '@/components/ui/button'
import { useFetchPayables } from '@/hooks/queries/useFetchPayables'
import { useFetchAssignors } from '@/hooks/queries/useFetchAssignors'
import { format } from 'date-fns'

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
         <div className="my-3 rounded-md border">
            <Table>
               <TableHeader>
                  <TableRow className="bg-muted/40">
                     <TableHead>Id</TableHead>
                     <TableHead>Data de emissão</TableHead>
                     <TableHead>Valor</TableHead>
                     <TableHead>Cedente</TableHead>
                     <TableHead className="w-[8%] text-center">Ações</TableHead>
                  </TableRow>
               </TableHeader>
               <TableBody>
                  {payables?.map((payable) => (
                     <TableRow key={payable.id} className="even:bg-muted/40">
                        <TableCell>{payable.id}</TableCell>
                        <TableCell>
                           {format(payable.emissionDate, 'dd/MM/yyyy')}
                        </TableCell>
                        <TableCell>
                           {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                           }).format(payable.value / 100)}
                        </TableCell>
                        <TableCell>
                           {assignors?.find((a) => a.id === payable.assignorId)?.name}
                        </TableCell>
                        <TableCell className="flex justify-center">
                           <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-8"
                              onClick={() => {}}
                           >
                              <Pencil />
                           </Button>
                           <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-8"
                              onClick={() => {}}
                           >
                              <Trash2 className="text-destructive" />
                           </Button>
                        </TableCell>
                     </TableRow>
                  ))}
               </TableBody>
            </Table>
         </div>
      </Page>
   )
}
