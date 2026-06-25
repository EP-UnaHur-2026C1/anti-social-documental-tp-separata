const mongoose = require("mongoose")

const tagSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true,
            lowercase: true,
            unique: true,
            minLength: 3,
            maxLength: 15
        }
    },
    {
        timestamps: true,
    },
)

const Tag = mongoose.model("Tag", tagSchema)
module.exports = Tag