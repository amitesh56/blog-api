const zod = require("zod")

const blogSchema = zod.object({
    title : zod.string(),
    content : zod.string()
})

module.exports = blogSchema