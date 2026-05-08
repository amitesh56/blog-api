const zod = require("zod");

const replySchema = zod.object({
    reply: zod
        .string()
        .trim()
        .min(1, "Reply cannot be empty")
        .max(500, "Reply cannot exceed 500 characters")
});

module.exports = replySchema;