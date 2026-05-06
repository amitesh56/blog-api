const zod = require("zod")

const commentSchema = zod.object({
    comments : zod.string().min(1).max(500)
})

module.exports = commentSchema