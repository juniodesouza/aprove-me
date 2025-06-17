import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.user.upsert({
    where: { login: 'aprovame' },
    update: {},
    create: {
      login: 'aprovame',
      password: '$2b$10$cGaSSNiPclgj9sBqX3iSAup2WSpmoYDz7l6jWaKTeG/Xgmf.rSXey', // hashed password for 'aprovame'
    },
  })

  console.log('✅ Seed completed successfully!')
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
