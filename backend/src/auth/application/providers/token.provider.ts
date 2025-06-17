export abstract class TokenProvider {
  abstract generateAccessToken(user: string): Promise<string>
  abstract verifyToken(token: string): Promise<any>
}
