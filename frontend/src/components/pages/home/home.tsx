import { useAuth } from '@/contexts/auth.context'

export function Home() {
   const { user } = useAuth()

   return <h1>Dashboard {user.name}</h1>
}
