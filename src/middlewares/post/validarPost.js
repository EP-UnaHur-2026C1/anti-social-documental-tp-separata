const { postSchema, postActualizarSchema, postImageSchema } = require("../../schemas/post.schema")

const validarPost = (req, res, next) => {
    if (req.user) {
        req.body.user = req.params.id
    }
    const { error } = postSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    req.userId = req.body.user
    next()
}

const validarPostDatos = (req, res, next) => {
    const { error } = postActualizarSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

const validarPostImage = (req, res, next) => {
    const { error } = postImageSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    next()
}

module.exports = { validarPost, validarPostDatos, validarPostImage }