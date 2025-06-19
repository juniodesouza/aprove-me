import {
   AlertDialog,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Button } from '../ui/button'

interface DeleteAlertDialogProps {
   open: boolean
   onOpenChange: (open: boolean) => void
   onConfirm: () => void
}

export default function DeleteAlertDialog({
   open,
   onOpenChange,
   onConfirm,
}: DeleteAlertDialogProps) {
   return (
      <AlertDialog open={open} onOpenChange={onOpenChange}>
         <AlertDialogContent>
            <AlertDialogHeader>
               <AlertDialogTitle>Deseja realmente excluir?</AlertDialogTitle>
               <AlertDialogDescription>
                  A exclusão deste registro é permanente e não poderá ser
                  revertida. Deseja continuar?
               </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
               <AlertDialogCancel>Cancelar</AlertDialogCancel>
               <Button onClick={onConfirm} variant={'destructive'}>
                  Excluir
               </Button>
            </AlertDialogFooter>
         </AlertDialogContent>
      </AlertDialog>
   )
}
