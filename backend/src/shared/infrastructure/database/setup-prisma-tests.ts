import { execSync } from 'node:child_process'

export function setupPrismaTests() {
  console.log('\nSetting up Prisma for tests...')
  execSync('npx dotenv-cli -e .env.test -- npx prisma migrate deploy')
}
