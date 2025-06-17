import { z } from 'zod'

const envSchema = z.object({
   VITE_API_URL: z.string().url(),
})

const Environment = envSchema.parse(import.meta.env)

export default Environment
