import type { RegisterRequest } from '../schemas/register-schema'
import { registerUseCase } from '@/use-cases/register-use-case'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function registerController(
  request: FastifyRequest<{ Body: RegisterRequest }>,
  reply: FastifyReply,
) {
  const { email, name, password } = request.body

  const user = await registerUseCase({ email, name, password })

  return reply.status(201).send(user)
}
