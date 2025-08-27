// Basic API setup - can be replaced with ORPC when stable
import { z } from 'zod'

// Example API schema
export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
})

export const createUserSchema = userSchema.omit({ id: true })

// Example API functions
export const api = {
  users: {
    getAll: async () => {
      // This would connect to your database
      return []
    },
    create: async (data: z.infer<typeof createUserSchema>) => {
      // This would create a user in your database
      return { id: '1', ...data }
    },
  },
}
