const Tag = require("../models/Tag")

const obtenerTags = async (req, res) => {
    try {
        const tags = await Tag.find().select("-createdAt -updatedAt -__v")
        res.status(200).json(tags)
    } catch (error) {
        res.status(500).json({ error: "Error al encontrar las tags" })
    }
}

const obtenerTag = (req, res) => {
    res.status(200).json(req.tag)
}

const crearTag = async (req, res) => {
    try {
        await Tag.create(req.body)
        res.status(201).json({ message: "Tag creada correctamente" })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El nombre de la tag ya está en uso" })
        }
        res.status(500).json({ error: "Error al crear la tag" })
    }
}

const actualizarTag = async (req, res) => {
    try {
        await req.tag.updateOne(req.body, { runValidators: true })
        res.status(200).json({ message: "Tag actualizada correctamente" })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El nombre de la tag ya está en uso" })
        }
        res.status(500).json({ error: "Error al actualizar la tag" })
    }
}

const eliminarTag = async (req, res) => {
    try {
        await req.tag.deleteOne()
        res.status(200).json({ message: "Tag eliminada correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar la tag" })
    }
}

module.exports = {
    obtenerTags,
    obtenerTag,
    crearTag,
    actualizarTag,
    eliminarTag
}