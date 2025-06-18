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
import { format } from 'date-fns'

interface Payable {
  id: string
  emissionDate: Date
  value: number
  assignorId: string
}

interface Assignor {
  id: string
  name: string
}

interface PayableTableProps {
  payables?: Payable[]
  assignors?: Assignor[]
}

export function PayableTable({ payables = [], assignors = [] }: PayableTableProps) {
  return (
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
          {payables.map((payable) => (
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
                {assignors.find((a) => a.id === payable.assignorId)?.name}
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
  )
}
