const Comment = require("../../models/Comment")

const validarCommentEnPost = async (req, res, next) => {
    try {
        const { commentId, id } = req.params
        const comment = await Comment.findOne({ _id: commentId, post: id })
            .populate("user", "nickName -_id").select("-updatedAt -__v")
        if (!comment) {
            return res.status(404).json({ message: "Comentario no encontrado." })
        }
        req.comment = comment
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el comentario." })
    }
}

module.exports = validarCommentEnPost