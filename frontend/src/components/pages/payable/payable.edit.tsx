/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputCurrency } from '@/components/inputs/currency'
import { InputDate } from '@/components/inputs/date'
import { InputSelect } from '@/components/inputs/select'
import { currencyValidator } from '@/components/inputs/validators/currency.validator'
import { dateValidator } from '@/components/inputs/validators/date.validator'
import { selectValidator } from '@/components/inputs/validators/select.validator'
import { Page } from '@/components/layout/page'
import { Button } from '@/components/ui/button'
import {
   Form,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { handleApiError } from '@/helpers/api-error-handler'
import { toast } from '@/hooks/use-toast'
import { api } from '@/services/api.service'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { z } from 'zod'

const formSchema = z.object({
   value: currencyValidator({ require: true }),
   emissionDate: dateValidator({ require: true }),
   assignorId: selectValidator({ require: true }),
})

type FormValues = z.infer<typeof formSchema>
type selectOptions = { value: string; label: string }[]

export function PayableEdit() {
   const navigate = useNavigate()
   const { id } = useParams()

   const [isLoading, setIsLoading] = useState(false)
   const [assignors, setAssignors] = useState<selectOptions>([
      { value: '32277cd0-d46a-4515-b0a2-7bd857385e5c', label: 'Cedente 1' },
      { value: '793a7625-3054-4b48-a5c8-04d4480b7f63', label: 'Cedente 2' },
   ])

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         value: null,
         emissionDate: null,
         assignorId: null,
      },
   })

   const onSubmit = async (data: FormValues) => {
      setIsLoading(true)

      try {
         id
            ? await api.patch(`payable/${id}`, data)
            : await api.post('payable', data)

         toast({
            description: id
               ? 'Alterações salvas com sucesso!'
               : 'Cadastro realizado com sucesso!',
            variant: 'success',
            duration: 1500,
         })

         setIsLoading(false)

         navigate(`/app/payables`)
      } catch (error) {
         setIsLoading(false)
         handleApiError(error)
      }
   }

   const onCancel = () => {
      navigate(`/app/payables`)
   }

   return (
      <Page title="Pagáveis">
         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
               <div className="grid grid-cols-12 gap-4">
                  <FormField
                     control={form.control}
                     name={'emissionDate'}
                     render={({ field }) => (
                        <FormItem className="col-span-12 space-y-0 sm:col-span-3">
                           <FormLabel>Data de emissão</FormLabel>
                           <InputDate props={field as any} />
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name={'value'}
                     render={({ field }) => (
                        <FormItem className="col-span-12 space-y-0 sm:col-span-3">
                           <FormLabel>Valor</FormLabel>
                           <InputCurrency props={field as any} />
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name={'assignorId'}
                     render={({ field }) => (
                        <FormItem className="col-span-12 space-y-0 sm:col-span-6">
                           <FormLabel>Cedente</FormLabel>
                           <InputSelect
                              itens={assignors}
                              props={field as any}
                           />
                           <FormMessage />
                        </FormItem>
                     )}
                  />
               </div>
               <div className="col-span-12 mt-6 flex items-center justify-center gap-4">
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
      </Page>
   )
}
