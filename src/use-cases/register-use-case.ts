import type { RegisterBody } from '@/http/schemas/register-schema'
import { prisma } from '@/lib/prisma'

export async function registerUseCase({ email, name, password }: RegisterBody) {
  const result = await prisma.user.create({
    data: {
      name,
      email,
      password_hash: password,
    },
  })

  return result
}
