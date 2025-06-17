import { jwtDecode } from 'jwt-decode'
import { api } from './api.service'

type LoginInput = {
   login: string
   password: string
}

type TokenResponse = {
   accessToken: string
}

type SetTokensInput = {
   accessToken: string
}

type GetTokensResponse = {
   accessToken: string | null
}

type JwtPayload = {
   exp: number
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   [key: string]: any
}

export type User = {
   name: string
}

export class AuthService {
   static setTokens({ accessToken }: SetTokensInput) {
      if (accessToken) {
         window.localStorage.setItem('accessToken', accessToken)
      }
   }

   static getTokens(): GetTokensResponse {
      const accessToken = window.localStorage.getItem('accessToken')

      return {
         accessToken,
      }
   }

   static removeTokens() {
      window.localStorage.removeItem('accessToken')
      window.location.reload()
   }

   static isTokenExpired(accessToken: string): boolean {
      const bufferSeconds = 10

      try {
         const decoded = jwtDecode<JwtPayload>(accessToken)
         const now = Math.floor(Date.now() / 1000)

         return decoded.exp < now + bufferSeconds
      } catch (err) {
         return true
      }
   }

   static isAuthenticated(): boolean {
      const { accessToken } = AuthService.getTokens()
      return !!accessToken && !AuthService.isTokenExpired(accessToken)
   }

   static async login({ login, password }: LoginInput) {
      const response = await api.post<TokenResponse>('/auth', {
         login: login,
         password: password,
      })

      AuthService.setTokens({
         accessToken: response.data.accessToken,
      })
   }

   static async logout() {
      AuthService.removeTokens()
   }

   static getUser(): User {
      const { accessToken } = AuthService.getTokens()

      let user = {} as User

      if (accessToken) {
         const decoded = jwtDecode<{ sub: string }>(accessToken)
         user = {
            name: decoded.sub,
         }
      }

      return user
   }
}
