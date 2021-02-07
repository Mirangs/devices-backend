import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

router.get('/', async (_, res) => {
  const projects = await prisma.project.findMany({
    where: {
      deleted: false,
    },
    include: {
      users: {
        include: {
          user: true,
        },
        where: {
          user: {
            disabled: false,
          },
        },
      },
      devices: true,
    },
  })
  return res.json(projects)
})

export default router
