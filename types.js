const z = require('zod')

const zodUserSchema =z.object({
    username: z.string().email(),
    password: z.string().min(5)
});

module.exports = {zodUserSchema}