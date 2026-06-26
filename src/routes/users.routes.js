const { Router } = require("express")
const router = Router()
const usersController = require("../controllers/users.controllers")
const validarUser = require("../middlewares/user/validarUser")
const validarUserId = require("../middlewares/user/validarUserId")
const validarDependenciasDeUser = require("../middlewares/user/validarDependenciasDeUser")

const { obtenerPostsDeUnUser, obtenerPost, crearPost } = require("../controllers/posts.controllers")
const validarPostEnUser = require("../middlewares/post/validarPostEnUser")
const { validarPostDatos } = require("../middlewares/post/validarPost")
const { validarPostId } = require("../middlewares/post/validarPostId")
const { obtenerComentariosDeUnUser, crearComentario } = require("../controllers/comments.controllers")
const { validarCommentDatos } = require("../middlewares/comment/validarComment")

router.get("/", usersController.obtenerUsuarios)
router.get("/:id", validarUserId, usersController.obtenerUsuario)
router.post("/", validarUser, usersController.crearUsuario)
router.put("/:id", validarUserId, validarUser, usersController.actualizarUsuario)
router.delete("/:id", validarUserId, validarDependenciasDeUser, usersController.eliminarUsuario)

//  Posts
router.get("/:id/posts", validarUserId, obtenerPostsDeUnUser)
router.get("/:id/posts/:postId", validarUserId, validarPostEnUser, obtenerPost)
router.post("/:id/posts/", validarUserId, validarPostDatos, crearPost)

//  Comments
router.get("/:id/comments", validarUserId, obtenerComentariosDeUnUser)
router.post("/:id/posts/:postId/comments", validarUserId, validarPostId, validarCommentDatos, crearComentario)

module.exports = router