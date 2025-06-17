import * as bcrypt from 'bcrypt'
import { BcryptHashAdapter } from '../../bcrypt.adapter'

jest.mock('bcrypt')

describe('BcryptHashAdapter unit tests', () => {
  let sut: BcryptHashAdapter
  let saltRounds: number

  beforeEach(() => {
    sut = new BcryptHashAdapter()
    ;(bcrypt.hash as jest.Mock).mockClear()
    ;(bcrypt.compare as jest.Mock).mockClear()

    saltRounds = sut['saltRounds']
  })

  it('should be defined', () => {
    expect(sut).toBeDefined()
  })

  describe('hash()', () => {
    it('should call bcrypt.hash with the correct values', async () => {
      const plainText = 'password123'
      const hashed = 'hashed_password'
      ;(bcrypt.hash as jest.Mock).mockResolvedValue(hashed)

      const result = await sut.hash(plainText)

      expect(bcrypt.hash).toHaveBeenCalledWith(plainText, saltRounds)
      expect(result).toBe(hashed)
    })

    it('should return the hashed value', async () => {
      const plainText = 'password123'
      const hashed = 'hashed_password'
      ;(bcrypt.hash as jest.Mock).mockResolvedValue(hashed)

      const result = await sut.hash(plainText)

      expect(result).toBe(hashed)
    })

    it('should throw if bcrypt.hash throws', async () => {
      const plainText = 'password123'
      const error = new Error('Failed to hash')
      ;(bcrypt.hash as jest.Mock).mockRejectedValue(error)

      await expect(sut.hash(plainText)).rejects.toThrow(error)
    })
  })

  describe('compare()', () => {
    it('should call bcrypt.compare with the correct values', async () => {
      const plainText = 'password123'
      const hashed = 'hashed_password'
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

      await sut.compare(plainText, hashed)

      expect(bcrypt.compare).toHaveBeenCalledWith(plainText, hashed)
    })

    it('should return true if bcrypt.compare returns true', async () => {
      const plainText = 'password123'
      const hashed = 'hashed_password'
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(true)

      const result = await sut.compare(plainText, hashed)

      expect(result).toBe(true)
    })

    it('should return false if bcrypt.compare returns false', async () => {
      const plainText = 'wrong_password'
      const hashed = 'hashed_password'
      ;(bcrypt.compare as jest.Mock).mockResolvedValue(false)

      const result = await sut.compare(plainText, hashed)

      expect(result).toBe(false)
    })

    it('should throw if bcrypt.compare throws', async () => {
      const plainText = 'password123'
      const hashed = 'hashed_password'
      const error = new Error('Comparison failed')
      ;(bcrypt.compare as jest.Mock).mockRejectedValue(error)

      await expect(sut.compare(plainText, hashed)).rejects.toThrow(error)
    })
  })
})
