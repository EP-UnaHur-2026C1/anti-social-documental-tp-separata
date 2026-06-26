const User = require("../models/User")

const obtenerUsuarios = async (req, res) => {
    try {
        const users = await User.find().select("-createdAt -updatedAt -__v")
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener los usuarios" })
    }
}

const obtenerUsuario = (req, res) => {
    res.status(200).json(req.user)
}

const crearUsuario = async (req, res) => {
    try {
        await User.create(req.body)
        res.status(201).json({ message: "Usuario creado correctamente" })
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El nombre de usuario o el correo ya está en uso" })
        }
        res.status(500).json({ error: "Error al crear el usuario" })
    }
}

const actualizarUsuario = async (req, res) => {
    try {
        const user = req.user
        user.set(req.body)
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        if (error.code === 11000) {
            return res.status(400).json({ message: "El nombre de usuario o el correo ya está en uso" })
        }
        res.status(500).json({ error: "Error al actualizar el usuario" })
    }
}

const eliminarUsuario = async (req, res) => {
    try {
        await req.user.deleteOne()
        res.status(200).json({ message: "Usuario eliminado correctamente" })
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario" })
    }
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario
}