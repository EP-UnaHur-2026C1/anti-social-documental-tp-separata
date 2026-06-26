const Joi = require("joi")

const postSchema = Joi.object({
    descripcion: Joi.string().min(10).max(500).required().messages({
        "string.base": "La descripción debe ser un texto",
        "string.empty": "La descripción es obligatoria",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no debe superar los 500 caracteres",
        "any.required": "La descripción es obligatoria"
    }),
    user: Joi.string().hex().length(24).required().messages({
        "string.base": "El id del usuario debe ser un texto",
        "any.required": "El id del usuario es obligatorio"
    }),
    images: Joi.array().items(Joi.object({ url: Joi.string().uri().required() }).required())
})

const postActualizarSchema = Joi.object({
    descripcion: Joi.string().min(10).max(500).required().messages({
        "string.base": "La descripción debe ser un texto",
        "string.empty": "La descripción es obligatoria",
        "string.min": "La descripción debe tener al menos 10 caracteres",
        "string.max": "La descripción no debe superar los 500 caracteres",
        "any.required": "La descripción es obligatoria"
    })
})

const postImageSchema = Joi.object({
    url: Joi.string().uri().required().messages({
        "string.base": "La url debe ser un string",
        "string.uri": "El string debe ser una url valida",
        "any.required": "La url es obligatoria"
    }),
})

module.exports = { postSchema, postActualizarSchema, postImageSchema }