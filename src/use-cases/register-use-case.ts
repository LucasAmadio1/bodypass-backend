import type { RegisterRequest } from '@/http/schemas/register-schema'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function registerUseCase({
  email,
  name,
  password,
}: RegisterRequest) {
  const passwordHash = await hash(password, 6)

  const userWithSameEmail = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userWithSameEmail) {
    throw new Error('E-mail already exists.')
  }

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password_hash: passwordHash,
    },
  })

  return result
}
