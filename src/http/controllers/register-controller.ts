import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import type { RegisterRequest } from '../schemas/register-schema'
import { RegisterUseCase } from '@/use-cases/register-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

export async function registerController(
  request: FastifyRequest<{ Body: RegisterRequest }>,
  reply: FastifyReply,
) {
  try {
    const usersRepository = new PrismaUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { email, name, password } = request.body

    await registerUseCase.execute({ email, name, password })
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    return reply.status(500).send()
  }

  return reply.status(201).send()
}
