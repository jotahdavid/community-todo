const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const createMany = await prisma.category.createMany({
    data: [
      { name: 'Construção' },
      { name: 'Farms' },
      { name: 'Decoração' },
      { name: 'Automação' },
    ],
  })

  console.log(createMany)
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
