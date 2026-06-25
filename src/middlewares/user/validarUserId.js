const User = require("../../models/User")

const validarUserId = async (req, res, next) => {
    try {
        const id = (req.userId || req.params.id)
        const user = await User.findById(id).select("-createdAt -updatedAt -__v")
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" })
        }
        req.user = user
        next()
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario" })
    }
}

module.exports = validarUserId