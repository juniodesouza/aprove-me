import { useEffect } from 'react'
import LoginForm from './login-form'
import { AuthService } from '@/services/auth.service'
import { useNavigate } from 'react-router-dom'

export function Login() {
   const navigate = useNavigate()

   useEffect(() => {
      if (AuthService.isAuthenticated()) {
         return navigate(`/app`)
      }
   }, [navigate])

   return (
      <div className="flex min-h-screen w-full flex-col md:flex-row">
         <div className="login-image hidden md:flex md:w-1/2">
            <div className="flex h-full w-full flex-col justify-between bg-black/30 p-8">
               <div className="pt-6">
                  <div className="flex items-center">
                     <img src="/logo.png" className="w-[50px]" />
                  </div>
               </div>
            </div>
         </div>

         <div className="flex w-full flex-col items-center justify-center bg-background p-6 md:w-1/2 md:p-16">
            <div className="w-full max-w-md">
               <LoginForm />
            </div>
         </div>
      </div>
   )
}
