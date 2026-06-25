const Comment = require("../../models/Comment")

const validarCommentIdConEntidades = async (req, res, next) => {
    try {
        const { id } = req.params
        const comment = await Comment.findById(id).populate("user", "nickName -_id").select("-updatedAt -__v")
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado" })
        }
        req.comment = comment
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el comentario" })
    }
}

const validarCommentId = async (req, res, next) => {
    try {
        const { id } = req.params
        const comment = await Comment.findById(id)
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado" })
        }
        req.comment = comment
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el comentario" })
    }
}

module.exports = { validarCommentId, validarCommentIdConEntidades }