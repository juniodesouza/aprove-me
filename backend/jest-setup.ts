import { Logger } from '@nestjs/common'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.test' })

jest.spyOn(Logger.prototype, 'log').mockImplementation(() => {})
jest.spyOn(Logger.prototype, 'error').mockImplementation(() => {})
jest.spyOn(Logger.prototype, 'warn').mockImplementation(() => {})
jest.spyOn(Logger.prototype, 'debug').mockImplementation(() => {})
jest.spyOn(Logger.prototype, 'verbose').mockImplementation(() => {})
