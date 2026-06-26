const Post = require("../../models/Post")

const validarPostEnUser = async (req, res, next) => {
    try {
        const { postId, id } = req.params
        const post = await Post.findOne({ _id: postId, user: id })
            .populate("user", "nickName -_id")
            .populate("tags", "nombre -_id")
            .select("-updatedAt -__v")
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado." })
        }
        req.post = post
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el post." })
    }
}

module.exports = validarPostEnUser