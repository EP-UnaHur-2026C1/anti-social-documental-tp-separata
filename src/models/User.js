const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        nickName: {
            type: String,
            required: [true, "El nombre de usuario es obligatorio"],
            trim: true,
            lowercase: true,
            unique: true,
            minLength: 3,
            maxLength: 20
        },
        mail: {
            type: String,
            required: [true, "El correo es obligatorio"],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, "La contraseña es obligatoria"],
            trim: true,
            minLength: 8,
            maxLength: 20
        }
    },
    {
        timestamps: true,
    },
)

const User = mongoose.model("User", userSchema)
module.exports = User