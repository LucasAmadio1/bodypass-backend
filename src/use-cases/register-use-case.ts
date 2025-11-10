import type { RegisterRequest } from '@/http/schemas/register-schema'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'
import { PrismaUsersRepository } from '@/repositories/prisma-users-repository'

export async function registerUseCase({
  email,
  name,
  password,
}: RegisterRequest) {
  const prismaUsersRepository = new PrismaUsersRepository()

  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  await prismaUsersRepository.create({
    name,
    email,
    password_hash: passwordHash,
  })
}
