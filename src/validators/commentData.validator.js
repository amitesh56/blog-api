const zod = require("zod")

const commentSchema = zod.object({
    comments : zod.string()
})

module.exports = commentSchema