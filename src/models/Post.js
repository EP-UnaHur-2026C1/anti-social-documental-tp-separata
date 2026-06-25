const mongoose = require("mongoose")

const imageSchema = new mongoose.Schema(
    {
        url: {
            type: String,
            required: [true, "La url es obligatoria"],
            trim: true,
        }
    }
)

const postSchema = new mongoose.Schema(
    {
        descripcion: {
            type: String,
            required: [true, "La descripción es obligatoria"],
            trim: true,
            minLength: 10,
            maxLength: 500
        },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "El usuario es obligatorio"] },
        images: [imageSchema],
        tags: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Tag"
            }
        ]
    },
    {
        timestamps: true,
    },
)

const Post = mongoose.model("Post", postSchema)
module.exports = Post