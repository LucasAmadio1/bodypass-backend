import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import type { RegisterRequest } from '../schemas/register-schema'
import { RegisterUseCase } from '@/use-cases/register-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function registerController(
  request: FastifyRequest<{ Body: RegisterRequest }>,
  reply: FastifyReply,
) {
  const usersRepository = new PrismaUsersRepository()
  const registerUseCase = new RegisterUseCase(usersRepository)

  const { email, name, password } = request.body

  await registerUseCase.execute({ email, name, password })

  return reply.status(201).send()
}
