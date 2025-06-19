import { Form, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import type { FormAssignorValues } from '@/hooks/mutations/useUpsertAssignor'

const formSchema = z.object({
  name: z.string().min(1, 'Nome obrigatório'),
  document: z.string().min(1, 'Documento obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(1, 'Telefone obrigatório'),
})

type Props = {
  initialData?: FormAssignorValues
  onSubmit: (data: FormAssignorValues) => void
  isLoading: boolean
  onCancel: () => void
}

export function AssignorForm({ initialData, onSubmit, isLoading, onCancel }: Props) {
  const form = useForm<FormAssignorValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ?? {
      name: '',
      document: '',
      email: '',
      phone: '',
    },
  })

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
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem className="col-span-12 sm:col-span-6">
                <FormLabel>Documento</FormLabel>
                <Input {...field} />
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
                <Input type="email" {...field} />
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
                <Input {...field} />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-12 mt-6 flex justify-center gap-4">
          <Button type="button" variant="outline" className="w-40" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit" className="w-40" disabled={isLoading}>
            {isLoading && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
            Salvar
          </Button>
        </div>
      </form>
    </Form>
  )
}
