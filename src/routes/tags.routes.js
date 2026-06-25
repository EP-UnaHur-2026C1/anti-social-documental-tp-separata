const { Router } = require("express")
const router = Router()
const tagsController = require("../controllers/tags.controllers")
const validarTag = require("../middlewares/tag/validarTag")
const validarTagId = require("../middlewares/tag/validarTagId")

router.get("/", tagsController.obtenerTags)
router.get("/:id", validarTagId, tagsController.obtenerTag)
router.post("/", validarTag, tagsController.crearTag)
router.put("/:id", validarTagId, validarTag, tagsController.actualizarTag)
router.delete("/:id", validarTagId, tagsController.eliminarTag)

module.exports = router