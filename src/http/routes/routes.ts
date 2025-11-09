import type { FastifyInstance } from 'fastify'
import { registerRoute } from './register-route'

export async function appRoutes(app: FastifyInstance) {
  app.register(registerRoute)
}
