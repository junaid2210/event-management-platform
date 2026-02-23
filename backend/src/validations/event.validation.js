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

module.exports = {createEventSchema};