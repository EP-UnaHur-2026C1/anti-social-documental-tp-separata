const Post = require("../models/Post")
const Comment = require("../models/Comment")

const obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "nickName -_id")
            .populate("tags", "nombre -_id").select("-updatedAt -__v")
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los posts" })
    }
}

const obtenerPost = (req, res) => {
    res.status(200).json(req.post)
}

const crearPost = async (req, res) => {
    try {
        await Post.create(req.body)
        res.status(201).json({ message: "Post creado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al crear el post" })
    }
}

const actualizarPost = async (req, res) => {
    try {
        const post = req.post
        post.set(req.body)
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el post" })
    }
}

const eliminarPost = async (req, res) => {
    try {
        await Comment.deleteMany({ post: req.post._id })
        await req.post.deleteOne()
        res.status(200).json({ message: "Post eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el post" })
    }
}

const agregarImagen = async (req, res) => {
    try {
        const post = req.post
        post.images.push(req.body)
        await post.save()
        res.status(201).json({ message: "Imagen agregada correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al agregar la imagen" })
    }
}

const eliminarImagen = async (req, res) => {
    try {
        const { imageId } = req.params
        const post = req.post
        post.images = post.images.filter(i => i._id.toString() !== imageId)
        await post.save()
        res.status(200).json({ message: "Imagen eliminada correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la imagen" })
    }
}

const asociarTag = async (req, res) => {
    try {
        const { tagId } = req.params
        const post = req.post
        post.tags.addToSet(tagId)
        await post.save()
        res.status(201).json({ message: "Tag asociada al post correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al asociar la tag al post" })
    }
}

const desasociarTag = async (req, res) => {
    try {
        const { tagId } = req.params
        const post = req.post
        post.tags = post.tags.filter(t => t.toString() !== tagId)
        await post.save()
        res.status(200).json({ message: "Tag desasociada del post correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al desasociar la tag del post" })
    }
}

const obtenerPostsDeUnUser = async (req, res) => {
    try {
        const { id } = req.params
        const posts = await Post.find({ user: id }).populate("user", "nickName -_id")
            .populate("tags", "nombre -_id").select("-updatedAt -__v")
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los posts del usuario" })
    }
}

module.exports = {
    obtenerPosts,
    obtenerPost,
    crearPost,
    actualizarPost,
    eliminarPost,
    agregarImagen,
    eliminarImagen,
    asociarTag,
    desasociarTag,
    obtenerPostsDeUnUser
}