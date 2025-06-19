import { Label } from '@/components/ui/label'
import {
   Sheet,
   SheetContent,
   SheetDescription,
   SheetTitle,
} from '@/components/ui/sheet'
import { formatCNPJ } from '@/helpers/format-cnpj'
import { formatCPF } from '@/helpers/format-cpf'
import { formatPhone } from '@/helpers/format-phone'
import { useFetchAssignors } from '@/hooks/queries/useFetchAssignors'
import { Payable } from '@/types/payable'
import { format } from 'date-fns'

interface PayableViewProps {
   open: boolean
   onOpenChange: (open: boolean) => void
   payable: Payable
}

export default function PayableView({
   open,
   onOpenChange,
   payable,
}: PayableViewProps) {
   const { data: assignors } = useFetchAssignors()

   const assignor = assignors?.find(
      (assignor) => assignor.id === payable.assignorId
   )

   return (
      <Sheet open={open} onOpenChange={onOpenChange}>
         <SheetContent>
            <SheetTitle></SheetTitle>
            <SheetDescription></SheetDescription>
            <h1 className="pb-2 text-2xl font-bold tracking-tight">Pagável</h1>
            <div className="mb-4">
               <Label>Id:</Label>
               <p>{payable.id}</p>
            </div>
            <div className="mb-4">
               <Label>Data de emissão:</Label>
               <p>{format(payable.emissionDate, 'dd/MM/yyyy')}</p>
            </div>
            <div className="mb-4">
               <Label>Valor:</Label>
               <p>
                  {new Intl.NumberFormat('pt-BR', {
                     style: 'currency',
                     currency: 'BRL',
                  }).format(payable.value / 100)}
               </p>
            </div>

            {assignor && (
               <>
                  <h1 className="mt-10 pb-2 text-2xl font-bold tracking-tight">
                     Cedente
                  </h1>
                  <div className="mb-4">
                     <Label>Nome:</Label>
                     <p>{assignor.name}</p>
                  </div>
                  <div className="mb-4">
                     <Label>E-mail:</Label>
                     <p>{assignor.email}</p>
                  </div>
                  <div className="mb-4">
                     <Label>Documento:</Label>
                     <p>
                        {assignor.document.length == 11
                           ? formatCPF(assignor.document)
                           : formatCNPJ(assignor.document)}
                     </p>
                  </div>
                  <div className="mb-4">
                     <Label>Telefone:</Label>
                     <p>{formatPhone(assignor.phone)}</p>
                  </div>
               </>
            )}
         </SheetContent>
      </Sheet>
   )
}
