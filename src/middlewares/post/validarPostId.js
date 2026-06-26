const Post = require("../../models/Post")

const validarPostIdConEntidades = async (req, res, next) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id).populate("user", "nickName -_id")
            .populate("tags", "nombre -_id").select("-updatedAt -__v")
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" })
        }
        req.post = post
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el post" })
    }
}

const validarPostId = async (req, res, next) => {
    try {
        const id = (req.params.postId || req.params.id)
        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ message: "Post no encontrado" })
        }
        req.post = post
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el post" })
    }
}

module.exports = { validarPostIdConEntidades, validarPostId }