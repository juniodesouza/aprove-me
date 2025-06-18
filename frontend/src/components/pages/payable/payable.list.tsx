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
                  <TableRow className="even:bg-muted/40">
                     <TableCell>1</TableCell>
                     <TableCell>01/01/2023</TableCell>
                     <TableCell>R$ 100,00</TableCell>
                     <TableCell>Empresa XYZ</TableCell>
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
               </TableBody>
            </Table>
         </div>
      </Page>
   )
}
