const { Router } = require("express")
const router = Router()
const usersController = require("../controllers/users.controllers")
const validarUser = require("../middlewares/user/validarUser")
const validarUserId = require("../middlewares/user/validarUserId")

router.get("/", usersController.obtenerUsuarios)
router.get("/:id", validarUserId, usersController.obtenerUsuario)
router.post("/", validarUser, usersController.crearUsuario)
router.put("/:id", validarUserId, validarUser, usersController.actualizarUsuario)
router.delete("/:id", validarUserId, usersController.eliminarUsuario)

module.exports = router