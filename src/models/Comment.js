const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema(
    {
        descripcion: {
            type: String,
            required: [true, "La descripción es obligatoria"],
            trim: true,
            minLength: 10,
            maxLength: 300
        },
        esVisible: {
            type: Boolean,
            default: true
        },
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: [true, "El post es obligatorio"] },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "El usuario es obligatorio"] }
    },
    {
        timestamps: true,
    },
)

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment