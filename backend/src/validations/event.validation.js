const { z } = require('zod');

const createEventSchema = z.object({
  body: z.object({
    title: z.string().trim().min(5, "Title is too short"),
    description: z.string().trim().min(20, "Description is too short"),
    date: z.string().refine((val) => !isNaN(Date.parse(val)), {
        message: "Invalid date format",
    }),
    time: z.string().min(1, "Time is required"),
    venue: z.string().trim().min(3, "Venue is required"),
    capacity: z.coerce.number().int().positive("Capacity must be at least 1"),
    isPublished: z.coerce.boolean().optional()
  }).strict() 
});

const getEventSchema = z.object({
  query: z.object({
    //Transform string to number
    page: z.string()
      .optional()
      .transform((val) => Math.max(1, parseInt(val) || 1)),

    //Transform string limit and enforce a HARD CAP of 50
    limit: z.string()
      .optional()
      .transform((val) => Math.min(50, Math.max(1,parseInt(val) || 10))),
    
    past: z.enum(['true','false']).optional()
  }),
});

module.exports = {createEventSchema, getEventSchema};