/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   Form,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { InputCurrency } from '@/components/inputs/currency'
import { InputDate } from '@/components/inputs/date'
import { InputSelect } from '@/components/inputs/select'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { currencyValidator } from '@/components/inputs/validators/currency.validator'
import { dateValidator } from '@/components/inputs/validators/date.validator'
import { selectValidator } from '@/components/inputs/validators/select.validator'

const formSchema = z.object({
   value: currencyValidator({ require: true }),
   emissionDate: dateValidator({ require: true }),
   assignorId: selectValidator({ require: true }),
})

export type FormPayableValues = z.infer<typeof formSchema>
type Props = {
   initialData?: FormPayableValues
   assignors: { value: string; label: string }[]
   onSubmit: (data: FormPayableValues) => void
   isLoading: boolean
   onCancel: () => void
}

export function PayableForm({
   initialData,
   assignors,
   onSubmit,
   isLoading,
   onCancel,
}: Props) {
   const form = useForm<FormPayableValues>({
      resolver: zodResolver(formSchema),
      defaultValues: initialData ?? {
         value: null,
         emissionDate: null,
         assignorId: null,
      },
   })

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4">
               <FormField
                  control={form.control}
                  name="emissionDate"
                  render={({ field }) => (
                     <FormItem className="col-span-12 sm:col-span-3">
                        <FormLabel>Data de emissão</FormLabel>
                        <InputDate props={field as any} />
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="value"
                  render={({ field }) => (
                     <FormItem className="col-span-12 sm:col-span-3">
                        <FormLabel>Valor</FormLabel>
                        <InputCurrency props={field as any} />
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="assignorId"
                  render={({ field }) => (
                     <FormItem className="col-span-12 sm:col-span-6">
                        <FormLabel>Cedente</FormLabel>
                        <InputSelect itens={assignors} props={field as any} />
                        <FormMessage />
                     </FormItem>
                  )}
               />
            </div>
            <div className="col-span-12 mt-6 flex justify-center gap-4">
               <Button
                  type="button"
                  variant="outline"
                  className="w-40"
                  onClick={onCancel}
               >
                  Cancelar
               </Button>
               <Button type="submit" className="w-40" disabled={isLoading}>
                  {isLoading && (
                     <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Salvar
               </Button>
            </div>
         </form>
      </Form>
   )
}
