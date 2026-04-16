const {z} = require("zod");

const userSchema = z.object({
    email : z.string().minLength(13, "Email is required"),
    password : z.string().minLength(8,"Character is required")
});

module.exports = {userSchema}