const mongoose = require("mongoose")
const MESES = parseInt(process.env.MESES, 10)

const commentSchema = new mongoose.Schema(
    {
        descripcion: {
            type: String,
            required: [true, "La descripción es obligatoria"],
            trim: true,
            minLength: 10,
            maxLength: 300
        },
        post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: [true, "El post es obligatorio"] },
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: [true, "El usuario es obligatorio"] }
    },
    {
        timestamps: true,
        id: false,
        toJSON: { virtuals: true }
    },
)

commentSchema.virtual("esVisible").get(function () {
    const limite = new Date()
    limite.setMonth(limite.getMonth() - MESES)
    return this.createdAt >= limite
})

const Comment = mongoose.model("Comment", commentSchema)
module.exports = Comment