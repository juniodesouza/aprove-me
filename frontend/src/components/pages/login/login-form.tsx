import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Eye, EyeOff, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { AuthService } from '@/services/auth.service'
import { useNavigate } from 'react-router-dom'
import { PersonIcon } from '@radix-ui/react-icons'

const formSchema = z.object({
   login: z.string(),
   password: z.string(),
})

type FormValues = z.infer<typeof formSchema>

const LoginForm = () => {
   const [isLoading, setIsLoading] = useState(false)
   const [showPassword, setShowPassword] = useState(false)
   const { toast } = useToast()
   const navigate = useNavigate()

   const form = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         login: '',
         password: '',
      },
   })

   const onSubmit = async (values: FormValues) => {
      setIsLoading(true)

      try {
         await AuthService.login({
            login: values.login,
            password: values.password,
         })

         toast({
            title: 'Login realizado com sucesso',
            description: `Bem-vindo de volta ${values.login}`,
            variant: 'success',
         })

         navigate(`/app`)
      } catch (error) {
         toast({
            title: 'Erro ao realizar o login',
            description: 'Verifique seu login e senha e tente novamente.',
            variant: 'danger',
         })
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <div className="animate-fade-in w-full space-y-6">
         <div className="space-y-2">
            <h1 className="text-3xl font-bold">Acesse sua conta</h1>
            <p className="text-muted-foreground">
               Informe seus dados para acessar sua conta
            </p>
         </div>

         <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
               <FormField
                  control={form.control}
                  name="login"
                  render={({ field }) => (
                     <FormItem className="animate-fade-in-delay-1">
                        <FormLabel>Login</FormLabel>
                        <FormControl>
                           <div className="relative">
                              <PersonIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                 placeholder="Seu login"
                                 className="h-10 pl-10"
                                 {...field}
                              />
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                     <FormItem className="animate-fade-in-delay-2">
                        <FormLabel>Senha</FormLabel>
                        <FormControl>
                           <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                 type={showPassword ? 'text' : 'password'}
                                 placeholder="******"
                                 className="h-10 pl-10 "
                                 {...field}
                              />
                              <Button
                                 type="button"
                                 variant="ghost"
                                 size="icon"
                                 onClick={() => setShowPassword(!showPassword)}
                                 className="absolute  right-0 top-0 h-full px-3 py-2 text-muted-foreground hover:text-foreground"
                              >
                                 {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                 ) : (
                                    <Eye className="h-4 w-4" />
                                 )}
                              </Button>
                           </div>
                        </FormControl>
                        <FormMessage />
                     </FormItem>
                  )}
               />

               <Button
                  type="submit"
                  className="animate-fade-in-delay-3 h-10 w-full"
                  disabled={isLoading}
               >
                  {isLoading ? 'Entrando...' : 'Entrar'}
               </Button>
            </form>
         </Form>
      </div>
   )
}

export default LoginForm
