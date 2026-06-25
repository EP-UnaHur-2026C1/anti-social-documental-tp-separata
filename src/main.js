const express = require("express")
const app = express()
const dotenv = require("dotenv")
const PORT = process.env.PORT || 3000
const conectarDB = require("./config/db")
dotenv.config()

const commentRouter = require("./routes/comments.routes")
const postRouter = require("./routes/posts.routes")
const tagRouter = require("./routes/tags.routes")
const userRouter = require("./routes/users.routes")

app.use(express.json())
conectarDB()

app.use("/comments", commentRouter)
app.use("/posts", postRouter)
app.use("/tags", tagRouter)
app.use("/users", userRouter)

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
})