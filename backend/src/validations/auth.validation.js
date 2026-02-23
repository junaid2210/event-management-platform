const { z } = require('zod');

const registerSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2, "Name is too short"),
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(['student', 'organizer'], { message: "Role must be student or organizer" }),
    collegeId: z.string().trim().min(1, "College ID is required")
  })
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().trim().email("Invalid email format"),
    password: z.string().min(1, "Password is required")
  })
});

module.exports = { registerSchema, loginSchema };