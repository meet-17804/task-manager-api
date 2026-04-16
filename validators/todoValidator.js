const {z} = require("zod");

const todoSchema = z.object({
    task: z.string().min(1, "Task is required"),
    dueDate: z.string().transform((val) => new Date(val))
});

module.exports = {todoSchema};