import type { FastifyReply, FastifyRequest } from 'fastify'
import { registerUseCase } from '@/use-cases/register-use-case'
import type { RegisterBody } from '../schemas/register-schema'

export async function registerController(
  request: FastifyRequest<{ Body: RegisterBody }>,
  reply: FastifyReply,
) {
  const { email, name, password } = request.body

  const user = await registerUseCase({ email, name, password })

  return reply.status(201).send(user)
}
