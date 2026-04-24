const zod = require("zod")

const userSchema = zod.object({
    username : zod.string().min(6).optional(),
    password : zod.string().min(6),
    email: zod.string().email("invalide email type")
})

module.exports = userSchema