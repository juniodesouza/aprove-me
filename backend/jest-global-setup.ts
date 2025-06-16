import { setupPrismaTests } from './src/shared/infrastructure/database/setup-prisma-tests'
import * as dotenv from 'dotenv'
import { existsSync } from 'fs'

export default async function globalSetup() {
  const envPath = '.env.test'
  if (!existsSync(envPath)) {
    throw new Error(
      ` File "${envPath}" not found. Please create it with the necessary environment variables.`,
    )
  }

  dotenv.config({ path: envPath })

  const args = process.argv.join(' ')
  if (args.includes('.int.spec.ts') || args.includes('.int.config.ts')) {
    setupPrismaTests()
  }
}
