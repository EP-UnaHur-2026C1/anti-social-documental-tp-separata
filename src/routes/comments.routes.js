const { Router } = require("express")
const router = Router()
const commentsController = require("../controllers/comments.controllers")
const { validarComment, validarCommentDatos } = require("../middlewares/comment/validarComment")
const { validarCommentId, validarCommentIdConEntidades } = require("../middlewares/comment/validarCommentId")
const validarUserId = require("../middlewares/user/validarUserId")
const { validarPostId } = require("../middlewares/post/validarPostId")

router.get("/", commentsController.obtenerComentarios)
router.get("/:id", validarCommentIdConEntidades, commentsController.obtenerComentario)
router.post("/", validarComment, validarPostId, validarUserId, commentsController.crearComentario)
router.put("/:id", validarCommentId, validarCommentDatos, commentsController.actualizarComentario)
router.delete("/:id", validarCommentId, commentsController.eliminarComentario)

module.exports = router