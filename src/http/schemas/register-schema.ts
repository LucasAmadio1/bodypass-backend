import z from 'zod'

export const registerBodySchema = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(6),
})

export const registerResponseSchema = {
  201: z.object({
    name: z.string(),
    email: z.email(),
    id: z.uuid(),
    password_hash: z.string().min(6),
    created_at: z.date(),
  }),
}

export type RegisterBody = z.infer<typeof registerBodySchema>
