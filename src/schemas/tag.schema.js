const Joi = require("joi")

const tagSchema = Joi.object({
    nombre: Joi.string().min(3).max(15).required().messages({
        "string.base": "El nombre de la tag debe ser un texto",
        "string.empty": "El nombre de la tag es obligatoria",
        "string.min": "El nombre de la tag debe tener al menos 3 caracteres",
        "string.max": "El nombre de la tag no debe superar los 15 caracteres",
        "any.required": "El nombre de la tag es obligatoria"
    }),
})

module.exports = tagSchema