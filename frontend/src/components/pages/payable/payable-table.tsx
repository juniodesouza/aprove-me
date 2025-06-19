import { EyeIcon, Pencil, Trash2 } from 'lucide-react'
import {
   Table,
   TableBody,
   TableCell,
   TableHead,
   TableHeader,
   TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import type { PayableTableProps } from '@/types/payable-table'
import CustomTooltip from '@/components/custom/custom-tooltip'

export function PayableTable({
   payables = [],
   onEdit,
   onDelete,
   onView,
}: PayableTableProps) {
   return (
      <div className="my-3 rounded-md border">
         <Table>
            <TableHeader>
               <TableRow className="bg-muted/40">
                  <TableHead>Id</TableHead>
                  <TableHead className="text-center">Data de emissão</TableHead>
                  <TableHead className="text-center">Valor</TableHead>
                  <TableHead className="text-center">Visualizar</TableHead>
                  <TableHead className="w-[8%] text-center">Ações</TableHead>
               </TableRow>
            </TableHeader>
            <TableBody>
               {payables.map((payable, key) => (
                  <TableRow key={key} className="even:bg-muted/40">
                     <TableCell className="max-w-[150px] truncate">
                        <CustomTooltip title={payable.id}>
                           <span>{payable.id}</span>
                        </CustomTooltip>
                     </TableCell>
                     <TableCell className="text-center">
                        {format(payable.emissionDate, 'dd/MM/yyyy')}
                     </TableCell>
                     <TableCell className="text-center">
                        {new Intl.NumberFormat('pt-BR', {
                           style: 'currency',
                           currency: 'BRL',
                        }).format(payable.value / 100)}
                     </TableCell>
                     <TableCell className="text-center">
                        <CustomTooltip title="Visualizar">
                           <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-8"
                              onClick={() => onView(payable)}
                           >
                              <EyeIcon />
                           </Button>
                        </CustomTooltip>
                     </TableCell>
                     <TableCell className="flex justify-center">
                        <CustomTooltip title="Editar">
                           <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-8"
                              onClick={() => onEdit(payable)}
                           >
                              <Pencil />
                           </Button>
                        </CustomTooltip>
                        <CustomTooltip title="Excluir">
                           <Button
                              variant="ghost"
                              size="icon"
                              className="h-5 w-8"
                              onClick={() => onDelete(payable)}
                           >
                              <Trash2 className="text-destructive" />
                           </Button>
                        </CustomTooltip>
                     </TableCell>
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </div>
   )
}
