import { Pencil, Trash2 } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import CustomTooltip from '@/components/custom/custom-tooltip'
import type { AssignorTableProps } from '@/types/assignor-table'

export function AssignorTable({ assignors = [], onEdit, onDelete }: AssignorTableProps) {
  return (
    <div className="my-3 rounded-md border">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/40">
            <TableHead className="w-[30%]">Id</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Documento</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead className="w-[8%] text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {assignors.map((assignor) => (
            <TableRow key={assignor.id} className="even:bg-muted/40">
              <TableCell>{assignor.id}</TableCell>
              <TableCell>{assignor.name}</TableCell>
              <TableCell>{assignor.document}</TableCell>
              <TableCell>{assignor.email}</TableCell>
              <TableCell>{assignor.phone}</TableCell>
              <TableCell className="flex justify-center">
                <CustomTooltip title="Editar">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-8"
                    onClick={() => onEdit(assignor)}
                  >
                    <Pencil />
                  </Button>
                </CustomTooltip>
                <CustomTooltip title="Excluir">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-8"
                    onClick={() => onDelete(assignor)}
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
