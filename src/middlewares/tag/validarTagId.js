const Tag = require("../../models/Tag")

const validarTagId = async (req, res, next) => {
    try {
        const id = (req.params.tagId || req.params.id)
        const tag = await Tag.findById(id).select("-createdAt -updatedAt -__v")
        if (!tag) {
            res.status(404).json({ message: "Tag no encontrada" })
        }
        req.tag = tag
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al encontrar la tag" })
    }
}

module.exports = validarTagId