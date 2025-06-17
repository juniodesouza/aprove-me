/* eslint-disable react-hooks/exhaustive-deps */
import { AuthService, User } from '@/services/auth.service'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type AuthContext = {
   isAuthenticated: boolean
   user: User
}
const AuthContext = createContext<AuthContext | undefined>(undefined)

function AuthProvider({ children }: { children: React.ReactNode }) {
   const navigate = useNavigate()
   const [user, setUser] = useState<User>({} as User)
   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
   const [isLoading, setIsLoading] = useState<boolean>(true)

   const checkUserSession = async () => {
      if (!AuthService.isAuthenticated()) {
         return navigate(`/login`)
      }

      const user = AuthService.getUser()

      setUser(user)
      setIsAuthenticated(true)
      setIsLoading(false)
   }

   useEffect(() => {
      checkUserSession()
   }, [])

   const contextValue = useMemo(
      () => ({
         isAuthenticated,
         user: user,
      }),
      [isAuthenticated, user]
   )

   return (
      !isLoading && (
         <AuthContext.Provider value={contextValue}>
            {children}
         </AuthContext.Provider>
      )
   )
}

function useAuth(): AuthContext {
   const context = useContext(AuthContext)

   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider')
   }

   return context
}

export default AuthProvider
export { AuthContext, useAuth }
