import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { registerController } from '../controllers/register-controller'
import {
  registerBodySchema,
  registerResponseSchema,
} from '../schemas/register-schema'

export const registerRoute: FastifyPluginAsyncZod = async (app) => {
  app.post(
    '/register',
    {
      schema: {
        summary: 'Create User',
        tags: ['Users'],
        body: registerBodySchema,
        response: registerResponseSchema,
      },
    },
    registerController,
  )
}
