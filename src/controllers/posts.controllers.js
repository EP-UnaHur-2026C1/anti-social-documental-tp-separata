const Post = require("../models/Post")

const obtenerPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate("user", "nickName -_id")
            .populate("tags", "nombre -_id").select("-createdAt -updatedAt -__v")
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
        await req.post.updateOne(req.body, { runValidators: true })
        res.status(200).json({ message: "Post actualizado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el post" })
    }
}

const eliminarPost = async (req, res) => {
    try {
        await req.post.deleteOne()
        res.status(200).json({ message: "Post eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el post" })
    }
}

module.exports = {
    obtenerPosts,
    obtenerPost,
    crearPost,
    actualizarPost,
    eliminarPost,
}