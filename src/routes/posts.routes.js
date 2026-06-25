const { Router } = require("express")
const router = Router()
const postsController = require("../controllers/posts.controllers")
const { validarPost, validarPostDatos } = require("../middlewares/post/validarPost")
const { validarPostIdConEntidades, validarPostId } = require("../middlewares/post/validarPostId")
const validarUserId = require("../middlewares/user/validarUserId")

router.get("/", postsController.obtenerPosts)
router.get("/:id", validarPostIdConEntidades, postsController.obtenerPost)
router.post("/", validarPost, validarUserId, postsController.crearPost)
router.put("/:id", validarPostId, validarPostDatos, postsController.actualizarPost)
router.delete("/:id", validarPostId, postsController.eliminarPost)

module.exports = router