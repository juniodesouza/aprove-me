import { toast } from '@/hooks/use-toast'
import { AxiosError } from 'axios'

const apiErrorMessages: Record<number | string, string> = {
   default: 'Ocorreu um erro inesperado.',
   400: 'Algo deu errado com a sua solicitação.',
   401: 'Você precisa estar logado para acessar esta funcionalidade.',
   403: 'Você não tem permissão para acessar esta área.',
   404: 'Não encontramos o que você está procurando.',
   408: 'A solicitação demorou muito para responder.',
   409: 'Conflito de informações.',
   429: 'Muitas tentativas em pouco tempo.',
   500: 'Tivemos um problema interno.',
   502: 'Nosso serviço está temporariamente fora do ar.',
   503: 'Estamos passando por uma instabilidade.',
   504: 'O servidor demorou muito para responder.',
   ERR_NETWORK: 'Algo deu errado.',
}

export default apiErrorMessages

export function handleApiError(error: unknown) {
   if (error instanceof AxiosError) {
      const statusOrCode =
         error.code === 'ERR_NETWORK' ? 'ERR_NETWORK' : error.response?.status

      const title = apiErrorMessages[statusOrCode || 'default']

      const apiMessage =
         error.response?.data?.message ||
         'Ocorreu um problema ao se conectar com o servidor.'

      toast({
         title: title,
         description: apiMessage,
         variant: 'danger',
      })

      console.log(error)
   } else {
      toast({
         title: 'Erro inesperado',
         description: 'Algo deu errado. Tente novamente mais tarde.',
         variant: 'danger',
      })
   }
}
