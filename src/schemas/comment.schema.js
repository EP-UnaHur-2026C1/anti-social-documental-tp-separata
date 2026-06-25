const Joi = require("joi")

const commentSchema = Joi.object({
    descripcion: Joi.string().min(10).max(300).required().messages({
        "string.base": "La descripción debe ser un texto",
        "string.empty": "La descripción es obligatoria",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no debe superar los 300 caracteres",
        "any.required": "La descripción es obligatoria"
    }),
    post: Joi.string().hex().length(24).required().messages({
        "string.base": "El id del post debe ser un texto",
        "any.required": "El id del post es obligatorio"
    }),
    user: Joi.string().hex().length(24).required().messages({
        "string.base": "El id del usuario debe ser un texto",
        "any.required": "El id del usuario es obligatorio"
    })
})

const commentActualizarSchema = Joi.object({
    descripcion: Joi.string().min(10).max(300).required().messages({
        "string.base": "La descripción debe ser un texto",
        "string.empty": "La descripción es obligatoria",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no debe superar los 300 caracteres",
        "any.required": "La descripción es obligatoria"
    })
})


module.exports = { commentSchema, commentActualizarSchema }