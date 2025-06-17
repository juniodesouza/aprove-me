import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'
import { HashProvider } from '@/shared/application/providers/hash.provider'

@Injectable()
export class BcryptHashAdapter implements HashProvider {
  private readonly saltRounds = 10

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.saltRounds)
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash)
  }
}
