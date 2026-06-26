const { commentSchema, commentActualizarSchema } = require("../../schemas/comment.schema")

const validarComment = (req, res, next) => {
    const { error } = commentSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    req.userId = req.body.user
    req.postId = req.body.post
    next()
}

const validarCommentDatos = (req, res, next) => {
    const { error } = commentActualizarSchema.validate(req.body)
    if (error) {
        return res.status(400).json({ error: error.details[0].message })
    }
    if (req.post) {
        req.body.post = req.params.postId
    }
    if (req.user) {
        req.body.user = req.params.id
    }
    next()
}

module.exports = { validarComment, validarCommentDatos }