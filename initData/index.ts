import { PrismaClient } from '@prisma/client'
import users from './user.json'
import projects from './project.json'
import devices from './device.json'

const prisma = new PrismaClient()

async function main() {
  await prisma.device.deleteMany()
  await prisma.usersOnProjects.deleteMany()
  await prisma.user.deleteMany()
  await prisma.project.deleteMany()

  for (let i = 0; i < projects.length; i++) {
    const project = projects[i]
    const createdProject = await prisma.project.create({
      data: {
        ...project,
        deleted: !!project.deleted,
      },
    })
    console.log(`Created ${createdProject.title} project`)
  }

  let uniqueUsers: any = []
  users.map((user) => {
    if (
      !uniqueUsers.find(
        (elem: any) =>
          elem.firstName === user.firstName && elem.lastName === user.lastName
      )
    ) {
      uniqueUsers = [...uniqueUsers, user]
    }
  })

  for (let i = 0; i < uniqueUsers.length; i++) {
    const user = uniqueUsers[i]
    const userProjects = await prisma.project.findMany({
      where: {
        id: {
          in: users
            .filter(
              (elem) =>
                elem.firstName === user.firstName &&
                elem.lastName === user.lastName
            )
            .map(({ projectId }) => projectId),
        },
      },
    })

    const createdUser = await prisma.user.create({
      data: {
        firstName: user.firstName,
        lastName: user.lastName,
        disabled: !!user.disabled,
      },
    })

    await Promise.all(
      userProjects.map(async ({ id: projectId }) => {
        await prisma.usersOnProjects.create({
          data: {
            userId: createdUser.id,
            projectId,
          },
        })
      })
    )
    console.log(`Created ${createdUser.id} user`)
  }

  for (let i = 0; i < devices.length; i++) {
    const device = devices[i]
    const createdDevice = await prisma.device.create({
      data: {
        ...device,
        deviceId: undefined,
      },
    })
    console.log(`Created ${createdDevice.deviceId} device`)
  }
}

main()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
