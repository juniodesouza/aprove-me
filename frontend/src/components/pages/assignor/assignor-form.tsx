/* eslint-disable @typescript-eslint/no-explicit-any */
import {
   Form,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { stringValidator } from '@/components/inputs/validators/string.validator'
import { InputString } from '@/components/inputs/string'
import { InputSelect } from '@/components/inputs/select'
import { formatCPF } from '@/helpers/format-cpf'
import { formatCNPJ } from '@/helpers/format-cnpj'
import { formatPhone } from '@/helpers/format-phone'

const formSchema = z.object({
   name: stringValidator({ require: true }),
   documentType: z.enum(['cpf', 'cnpj']).default('cpf'),
   document: stringValidator({ require: true, inputType: 'document' }),
   email: stringValidator({ require: true, inputType: 'email' }),
   phone: stringValidator({ require: true, inputType: 'phone' }),
})

export type FormAssignorValues = z.infer<typeof formSchema>

type Props = {
   initialData?: FormAssignorValues
   onSubmit: (data: FormAssignorValues) => void
   isLoading: boolean
   onCancel: () => void
}

export function AssignorForm({
   initialData,
   onSubmit,
   isLoading,
   onCancel,
}: Props) {
   const data = initialData ? { ...initialData } : undefined

   if (data) {
      if (data.document) {
         if (data.document.length === 11) {
            data.documentType = 'cpf'
            data.document = formatCPF(data.document)
         } else {
            data.documentType = 'cnpj'
            data.document = formatCNPJ(data.document)
         }
      }

      if (data.phone) {
         data.phone = formatPhone(data.phone)
      }
   }

   const form = useForm<FormAssignorValues>({
      resolver: zodResolver(formSchema),
      defaultValues: data ?? {
         name: null,
         document: null,
         email: null,
         phone: null,
         documentType: 'cpf',
      },
   })

   const documentType = form.watch('documentType')

   return (
      <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-12 gap-4">
               <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                     <FormItem className="col-span-12 sm:col-span-6">
                        <FormLabel>Nome</FormLabel>
                        <InputString props={field as any} />
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                     <FormItem className="col-span-12 sm:col-span-6">
                        <FormLabel>Email</FormLabel>
                        <InputString inputType="email" props={field as any} />
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="documentType"
                  render={({ field }) => (
                     <FormItem className="col-span-12 sm:col-span-2">
                        <FormLabel>Documento</FormLabel>
                        <InputSelect
                           itens={[
                              { value: 'cpf', label: 'CPF' },
                              { value: 'cnpj', label: 'CNPJ' },
                           ]}
                           props={field as any}
                        />
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="document"
                  render={({ field }) => (
                     <FormItem className="col-span-12 sm:col-span-4">
                        <FormLabel>Documento</FormLabel>
                        <InputString
                           inputType={documentType}
                           props={field as any}
                        />
                        <FormMessage />
                     </FormItem>
                  )}
               />
               <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                     <FormItem className="col-span-12 sm:col-span-6">
                        <FormLabel>Telefone</FormLabel>
                        <InputString inputType="phone" props={field as any} />
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
