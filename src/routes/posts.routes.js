const { Router } = require("express")
const router = Router()
const postsController = require("../controllers/posts.controllers")
const { validarPost, validarPostDatos, validarPostImage } = require("../middlewares/post/validarPost")
const { validarPostIdConEntidades, validarPostId } = require("../middlewares/post/validarPostId")

const validarUserId = require("../middlewares/user/validarUserId")
const validarTagId = require("../middlewares/tag/validarTagId")
const { obtenerComentariosDeUnPost, obtenerComentario } = require("../controllers/comments.controllers")
const validarCommentEnPost = require("../middlewares/comment/validarCommentEnPost")

router.get("/", postsController.obtenerPosts)
router.get("/:id", validarPostIdConEntidades, postsController.obtenerPost)
router.post("/", validarPost, validarUserId, postsController.crearPost)
router.put("/:id", validarPostId, validarPostDatos, postsController.actualizarPost)
router.delete("/:id", validarPostId, postsController.eliminarPost)

//  Images
router.post("/:id/images", validarPostId, validarPostImage, postsController.agregarImagen)
router.delete("/:id/images/:imageId", validarPostId, postsController.eliminarImagen)

//  Tags
router.post("/:id/tags/:tagId", validarPostId, validarTagId, postsController.asociarTag)
router.delete("/:id/tags/:tagId", validarPostId, validarTagId, postsController.desasociarTag)

//  Comments
router.get("/:id/comments", validarPostId, obtenerComentariosDeUnPost)
router.get("/:id/comments/:commentId", validarPostId, validarCommentEnPost, obtenerComentario)

module.exports = router