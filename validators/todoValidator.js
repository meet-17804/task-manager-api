const {z} = require("zod");

const todoSchema = z.object({
    task: z.string().min(1, "Task is required"),
    dueDate: z.string().transform((val) => new Date(val)),
    completed: z.boolean().optional(),
    priority: z.enum(["Low","Medium","High"]).optional(),
    status: z.enum(["Pending","In Progress","Completed"]).optional(),
});

module.exports = {todoSchema};