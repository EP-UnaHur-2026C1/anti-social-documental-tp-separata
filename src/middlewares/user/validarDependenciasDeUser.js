const Post = require("../../models/Post")
const Comment = require("../../models/Comment")

const validarDependenciasDeUser = async (req, res, next) => {
    try {
        const cantidadPosts = await Post.countDocuments({ user: req.params.id })
        const cantidadComments = await Comment.countDocuments({ user: req.params.id })
        if (cantidadPosts > 0 || cantidadComments > 0) {
            return res.status(409).json({ message: "No se puede eliminar al usuario si todavía tiene posts o comentarios publicados" })
        }
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al contar las dependencias del usuario" })
    }
}

module.exports = validarDependenciasDeUser