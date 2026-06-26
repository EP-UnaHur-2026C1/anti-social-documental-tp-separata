const Comment = require("../models/Comment")
const MESES = parseInt(process.env.MESES, 10)

const obtenerComentarios = async (req, res) => {
    try {
        const comments = await Comment.find().populate("user", "nickName -_id").select("-updatedAt -__v")
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los comentarios" })
    }
}

const obtenerComentario = (req, res) => {
    res.status(200).json(req.comment)
}

const crearComentario = async (req, res) => {
    try {
        await Comment.create(req.body)
        res.status(201).json({ message: "Comentario creado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al crear el comentario" })
    }
}

const actualizarComentario = async (req, res) => {
    try {
        const comment = req.comment
        comment.set(req.body)
        await comment.save()
        res.status(200).json(comment)
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el comentario" })
    }
}

const eliminarComentario = async (req, res) => {
    try {
        await req.comment.deleteOne()
        res.status(200).json({ message: "Comentario eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el comentario" })
    }
}

const obtenerComentariosDeUnPost = async (req, res) => {
    try {
        const limite = new Date()
        limite.setMonth(limite.getMonth() - MESES)
        const comments = await Comment.find({ post: req.params.id, createdAt: { $gt: limite } })
            .populate("user", "nickName -_id").select("-updatedAt -__v")
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los comentarios" })
    }
}

const obtenerComentariosDeUnUser = async (req, res) => {
    try {
        const comments = await Comment.find({ user: req.params.id })
            .populate("user", "nickName -_id").select("-updatedAt -__v")
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los comentarios" })
    }
}

module.exports = {
    obtenerComentarios,
    obtenerComentario,
    crearComentario,
    actualizarComentario,
    eliminarComentario,
    obtenerComentariosDeUnPost,
    obtenerComentariosDeUnUser
}